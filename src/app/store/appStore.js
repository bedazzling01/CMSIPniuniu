import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    escore: 0
  }),
  getters: {},
  actions: {
    saveEscore(score) {
      this.escore = score;
    }
  }
});