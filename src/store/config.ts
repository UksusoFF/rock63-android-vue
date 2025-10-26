import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  persist: true,
  state: () => ({
    theme: "dark" as "dark" | "light",
  }),
  getters: {
    isThemeDark: (state) => {
      return state.theme === "dark";
    },
  },
  actions: {
    init(): void {
      document.documentElement.classList.toggle("ion-palette-dark", this.isThemeDark);
    },
    toggleTheme(): void {
      this.theme = this.theme === "dark" ? "light" : "dark";

      document.documentElement.classList.toggle("ion-palette-dark", this.isThemeDark);
    },
  },
});
