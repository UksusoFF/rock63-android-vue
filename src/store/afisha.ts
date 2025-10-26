import Bugsnag from "@bugsnag/js";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import moment from "moment";
import { defineStore } from "pinia";

import { showMessage } from "@/helpers/toast";
import { APIEvent } from "@/types/event";
import { APIVenue } from "@/types/venue";

export const useAfishaStore = defineStore("events", {
  persist: true,
  state: () => ({
    loaded: false,
    lastUpdated: null as string | null,
    venues: [] as APIVenue[],
    events: [] as APIEvent[],
  }),
  getters: {
    isOutdated: (state) => {
      return state.lastUpdated ? moment().diff(moment.unix(state.lastUpdated), "day") >= 1 : true;
    },
    getEventById: (state) => {
      return (id: string): APIEvent | null => {
        return state.events.find((event: APIEvent) => event.id === id) ?? null;
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

        const venuesData: HttpResponse = await CapacitorHttp.get({
          url: "https://rock63.ru/api/v2/venues",
          params: {
            timestamp: `${timestamp}`,
          },
        });
        this.venues = venuesData.data;

        const eventData: HttpResponse = await CapacitorHttp.get({
          url: "https://rock63.ru/api/v2/events",
          params: {
            timestamp: `${timestamp}`,
          },
        });
        this.events = eventData.data;
        this.loaded = true;
        this.lastUpdated = timestamp;
      } catch (error) {
        console.log(error);

        Bugsnag.notify(error);

        void showMessage("Ошибка обновления, попробуйте позже");
      }
    },
    async forceFetch() {
      this.loaded = false;
      await this.fetch();
    },
  },
});
