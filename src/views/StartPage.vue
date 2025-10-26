<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Рок-афиша Самары</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="searchToggle">
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-progress-bar type="indeterminate" v-if="!afishaStore.loaded"></ion-progress-bar>
      </ion-toolbar>
      <ion-toolbar v-if="searchActive">
        <ion-searchbar
          :value="searchPhrase"
          placeholder="Поиск событий"
          @input="searchInput"
          @ionClear="searchClear"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="pullRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-button v-if="eventsIsEmpty && afishaStore.loaded" slot="fixed" @click="refresh">Обновить</ion-button>
      <ion-spinner v-if="eventsIsEmpty && !afishaStore.loaded" class="spinner-loading" color="primary"></ion-spinner>

      <template v-for="(events, group) in eventsWithGroups" :key="group">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ group }}</ion-card-title>
          </ion-card-header>
          <ion-card-content class="start-page-day-events">
            <ion-item button lines="full" v-for="event in events" :key="event.id" @click="eventClick(event)">
              <ion-thumbnail slot="end" v-if="event.img">
                <img :alt="event.title" :src="event.img.img_s" />
              </ion-thumbnail>
              <ion-label>
                <ion-text color="dark">
                  {{ event.title }}
                </ion-text>
                <template v-if="event.notify">
                  &nbsp;<ion-icon :icon="starOutline" color="primary"></ion-icon>
                </template>
                <template v-if="favoriteStore.events.includes(event.id)">
                  &nbsp;<ion-icon :icon="heart" color="primary"></ion-icon>
                </template>
                <br />
                <ion-text v-if="event.venue" color="medium">
                  <small>{{ event.venue?.title ?? "" }}</small>
                </ion-text>
              </ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/vue";
import { heart, search, starOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { humanDate } from "@/helpers/formatter";
import { useAfishaStore } from "@/store/afisha";
import { useFavoriteStore } from "@/store/favorites";
import { APIEvent, APIEventExtended, extend } from "@/types/event";

export default defineComponent({
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonProgressBar,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSpinner,
    IonThumbnail,
    IonTitle,
    IonText,
    IonToolbar,
  },
  setup() {
    const afishaStore = useAfishaStore();
    const favoriteStore = useFavoriteStore();
    const router = useRouter();

    return { afishaStore, favoriteStore, router, heart, search, starOutline };
  },
  data() {
    return {
      searchActive: false,
      searchPhrase: "",
    };
  },
  computed: {
    eventsIsEmpty(): boolean {
      return this.afishaStore.events.length === 0;
    },
    eventsWithGroups(): Record<string, APIEvent[]> {
      return this.afishaStore.events
        .map((event: APIEvent) => extend(event, this.afishaStore.venues))
        .filter((event: APIEventExtended) => {
          const search: string = this.searchPhrase.toLowerCase();

          return (
            event.title.toLowerCase().includes(search) ||
            event.desc.toLowerCase().includes(search) ||
            event.venue?.title.toLowerCase().includes(search) ||
            event.venue?.address.toLowerCase().includes(search)
          );
        })
        .reduce((result: string, event: APIEventExtended) => {
          const key = humanDate(event.start);

          if (!(key in result)) result[key] = [];

          result[key].push(event);

          return result;
        }, {});
    },
  },
  mounted() {
    this.afishaStore.fetch();
  },
  methods: {
    refresh(): void {
      this.afishaStore.forceFetch();
    },
    pullRefresh(event: RefresherCustomEvent): void {
      this.afishaStore.forceFetch().then(() => {
        event.target.complete();
      });
    },
    searchInput(e: InputEvent): void {
      this.searchPhrase = e.target.value ?? "";
    },
    searchClear(): void {
      this.searchPhrase = "";
    },
    searchToggle(): void {
      this.searchActive = !this.searchActive;
      this.searchClear();
    },
    eventClick(e: APIEventExtended): void {
      this.router.push(`/event/${e.id}`);
    },
  },
});
</script>

<style scoped>
.start-page-day-events {
  padding: 0;
}
ion-spinner.spinner-loading,
ion-button[slot="fixed"] {
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
