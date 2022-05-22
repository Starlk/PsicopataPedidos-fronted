import { defineStore } from "pinia";
import Roles from "../constant/Roles";

export const useTokeStore = defineStore("tokeStore", {
  state: () => {
    return {
      toke: "",
      authorizated: false,
      UserID: "",
      auth: false,
    };
  },

  getters: {
    getToke() {
      return this.toke;
    },
    getAuthorizated() {
      return this.authorizated;
    },
    getUser() {
      return this.UserID;
    },
    getAuth() {
      return this.auth;
    },
  },

  actions: {
    setToke(toke, role = "client", user) {
      this.toke = toke;
      this.authorizated = Roles.admin === role;
      this.UserID = user;
      this.auth = true;
    },
  },
});
