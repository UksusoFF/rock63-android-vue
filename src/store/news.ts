import Bugsnag from "@bugsnag/js";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import moment from "moment/moment";
import { defineStore } from "pinia";

import { APIArticle } from "@/types/article";

export const useNewsStore = defineStore("news", {
  persist: true,
  state: () => ({
    loaded: false,
    lastUpdated: null as string | null,
    nodes: [] as APIArticle[],
  }),
  getters: {
    isOutdated: (state) => {
      return state.lastUpdated ? moment.unix(state.lastUpdated).diff(moment(), "day") > 1 : true;
    },
    articles(state): APIArticle[] {
      return state.nodes.filter((node: APIArticle) => {
        return !node.url.includes("/event/");
      });
    },
    getArticleById: (state) => {
      return (id: string): APIArticle | null => {
        return state.nodes.find((article: APIArticle) => article.id === id) ?? null;
      };
    },
  },
  actions: {
    async fetch() {
      if (this.loaded && !this.isOutdated) {
        return;
      }

      try {
        const timestamp = new Date() / 1000;

        const articleData: HttpResponse = await CapacitorHttp.get({
          url: "https://rock63.ru/api/news",
          params: {
            timestamp: `${timestamp}`,
          },
        });
        this.nodes = articleData.data;
        this.loaded = true;
        this.lastUpdated = timestamp;
      } catch (error) {
        console.log(error);

        Bugsnag.notify(error);
      }
    },
    async forceFetch() {
      this.loaded = false;
      await this.fetch();
    },
  },
});
