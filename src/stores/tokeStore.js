import { defineStore } from "pinia";

export const useTokeStore = defineStore("tokeStore", {
  state: () => {
    return {
      toke: "",
    };
  },

  getters: {
    getToke() {
      return this.toke;
    },
  },

  actions: {
    setToke(toke) {
      this.toke = toke;
    },
  },
});
