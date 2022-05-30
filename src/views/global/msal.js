import {
  BrowserCacheLocation,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";
import EnvSetting from "../../conf/EnvSetting";
const msalConfig = {
  auth: {
    clientId: EnvSetting.AD_CLIENT_ID,
    authority: EnvSetting.AD_AUTHORITY,
    // knownAuthorities: ["projectcenterdev.b2clogin.com"],
    redirectUri: EnvSetting.AD_REDIRECTION,
    postLogoutRedirectUri: EnvSetting.AD_REDIRECTION,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;

          case LogLevel.Info:
            console.info(message);
            break;

          case LogLevel.Verbose:
            console.debug(message);
            break;

          case LogLevel.Warning:
            console.warn(message);
            break;

          default:
            break;
        }
      },
      piiLoggingEnabled: false,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
