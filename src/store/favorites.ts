import { LocalNotifications } from "@capacitor/local-notifications";
import { defineStore } from "pinia";

import { humanDateLong } from "@/helpers/formatter";
import { showMessage } from "@/helpers/toast";
import { APIEventExtended, canFavorite } from "@/types/event";

export const useFavoriteStore = defineStore("favorite", {
  persist: true,
  state: () => ({
    events: [] as string[],
    open: null as string | null,
  }),
  actions: {
    init(): void {
      void LocalNotifications.requestPermissions();

      void LocalNotifications.addListener("localNotificationActionPerformed", (payload) => {
        if (!payload.notification.extra.id) {
          return;
        }

        void showMessage(`/event/${payload.notification.extra.id}`);

        this.open = payload.notification.extra.id;
      });
    },
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

      const venueString = apiEvent.venue ? ` @ ${apiEvent.venue?.title}` : '';

      void LocalNotifications.schedule({
        notifications: [
          {
            id: parseInt(apiEvent.id),
            title: `${apiEvent.title}`,
            body: `${humanDateLong(apiEvent.start)}${venueString}`,
            schedule: { at: apiEvent.start.subtract(1, "day").toDate() },
            extra: {
              id: apiEvent.id,
            },
          },
        ],
      });
    },
  },
});
