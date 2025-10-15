import { LocalNotifications } from "@capacitor/local-notifications";
import { defineStore } from "pinia";

import { humanDateLong } from "@/helpers/formatter";
import { showMessage } from "@/helpers/toast";
import { APIEventExtended, canFavorite } from "@/types/event";

export const useFavoriteStore = defineStore("favorite", {
  persist: true,
  state: () => ({
    events: [] as string[],
  }),
  actions: {
    toggle(apiEvent: APIEventExtended): void {
      if (this.events.includes(apiEvent.id)) {
        this.events = this.events.filter((item: string): boolean => item !== apiEvent.id);
        return;
      }

      if (!canFavorite(apiEvent)) {
        return;
      }

      this.events.push(apiEvent.id);

      void showMessage("Пришлем напоминание за день");

      void LocalNotifications.requestPermissions();

      void LocalNotifications.schedule({
        notifications: [
          {
            id: parseInt(apiEvent.id),
            title: `${apiEvent.title}`,
            body: `${humanDateLong(apiEvent.start)} @ ${apiEvent.venue?.title}`,
            schedule: { at: apiEvent.start.subtract(1, "day").toDate() },
          },
        ],
      });
    },
  },
});
