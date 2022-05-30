import * as Msal from "msal";
import config from "@/config/azure-b2c";
import store from "@/store";

var msalConfig = {
  auth: {
    clientId: config.clientid,
    authority: config.authority,
    redirectUri: config.redirectUri,
    loadFrameTimeout: 3000000,
    validateAuthority: false,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: config.cacheLocation, // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" to save cache in cookies
  },
  system: {
    logger: new Msal.Logger(loggerCallback, {
      level: Msal.LogLevel.Verbose,
      piiLoggingEnabled: false,
      correlationId: "1234",
    }),
  },
};

function loggerCallback(logLevel, message, containsPii) {
  console.log(message);
}
function authRedirectCallBack(error, response) {
  if (error) {
    if (error.errorMessage.indexOf(config.codeErrorForgotPassword) >= 0) {
      localStorage.setItem("forgotPassword", "1");
      myMSALObj.authority = config.authorityForgotPassword;
      myMSALObj.loginRedirect();
    }

    console.log(error);
  } else {
    var forgotPassword = localStorage.getItem("forgotPassword");
    if (forgotPassword == "1") {
      localStorage.removeItem("forgotPassword");
      localStorage.removeItem("id_token_obj");
      localStorage.removeItem("token");
      myMSALObj.logout();
    } else if (response.tokenType === "access_token") {
      localStorage.setItem("token", response.accessToken);
      store.commit("set_token", response.accessToken);
    } else {
      localStorage.setItem("id_token_obj", JSON.stringify(response));
    }
  }
}

var myMSALObj = new Msal.UserAgentApplication(msalConfig);
// Register Callbacks for redirect flow
myMSALObj.handleRedirectCallback(authRedirectCallBack);

if (!localStorage.getItem("id_token_obj")) {
  localStorage.removeItem("id_token_obj");
  localStorage.removeItem("token");
  localStorage.clear();
  myMSALObj.loginRedirect();
} else if (!localStorage.getItem("token")) {
  store.commit("set_loading", true);
} else {
  store.commit("set_loading", false);
}

export default myMSALObj;
