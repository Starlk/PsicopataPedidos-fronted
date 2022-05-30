import config from "@/config/azure-b2c";
import store from "@/store";

export class B2CService {
  logout(authService) {
    localStorage.removeItem("id_token_obj");
    localStorage.removeItem("user");
    localStorage.removeItem("cookies");
    authService.logout();
  }

  getRequestObject() {
    return {
      redirectUri: config.redirectUri,
      scopes: config.scopes,
    };
  }

  async getToken(
    secondChance = false,
    cookies,
    myMSALObj,
    user,
    createUserCallback = null
  ) {
    var self = this;

    return await new Promise(async (resolve, reject) => {
      if (cookies) {
        var userP = user;
        await myMSALObj
          .acquireTokenSilent(B2CService.getRequestObject())
          .then(function (loginResponse) {
            if (!loginResponse.accessToken) {
              loginResponse.accessToken = localStorage.getItem("token");
            } else {
              localStorage.setItem("tokenObj", JSON.stringify(loginResponse));
              localStorage.setItem("token", loginResponse.accessToken);
              store.commit("set_token", loginResponse.accessToken);
            }
            if (!userP.id && !localStorage.getItem("TheUserIsAlreadysended")) {
              const { aud, family_name, given_name, auth_time, exp, emails } =
                loginResponse.idToken.claims;
              var user = {
                aud,
                wholeName: `${given_name} ${family_name}`,
                family_name,
                given_name,
                auth_time,
                exp,
                email: emails[0],
              };
              store.commit("set_user", user);
              store.commit("set_loading", false);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("TheUserIsAlreadysended", "1");
              if (createUserCallback) {
                createUserCallback(user);
              }
            }

            return resolve(loginResponse);
          })
          .catch(async (error) => {
            if (cookies) {
              if (!secondChance) {
                var token = await myMSALObj.acquireTokenRedirect(
                  B2CService.getRequestObject()
                );
                return resolve(myMSALObj);
              } else {
                alert(error);
                localStorage.clear();
                let newError = new Error(error);
                console.log(error);
                myMSALObj.logout();
                return reject(newError);
              }
            }
          });
      }
    });
  }

  setupCookies(component) {
    component.$forceUpdate();
    component.$store.commit("set_loading", false);
    var receiveMessage = (evt) => {
      component.searchingCookies = false;
      if (evt.data === "MM:3PCunsupported") {
        localStorage.setItem("cookies", "false");
        component.cookies = false;
      } else if (evt.data === "MM:3PCsupported") {
        component.cookies = true;
        localStorage.setItem("cookies", "true");
      }
      component.$forceUpdate();
      var loadingDiv = document.getElementById("loadingDiv");
      if (loadingDiv) {
        loadingDiv.remove();
      }
    };
    window.addEventListener("message", receiveMessage, false);
  }
}
