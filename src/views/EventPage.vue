<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="router.back">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>rock63.ru</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="canFavorite(apiEvent)" @click="eventFavorite">
            <ion-icon
              slot="icon-only"
              :icon="!favoriteStore.events.includes(apiEvent.id) ? heartOutline : heart"
            ></ion-icon>
          </ion-button>
          <ion-button :href="`https://s.rock63.ru/calendar/${apiEvent.id}`">
            <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
          </ion-button>
          <ion-button @click="eventShare">
            <ion-icon slot="icon-only" :icon="shareSocialOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <image-with-modal v-if="apiEvent.img" :img="apiEvent.img" />

          <ion-card-title>
            <p class="event-page-title">{{ apiEvent.title }}</p>
            <p class="event-page-date">
              {{ humanDateLong(apiEvent.start) }}
              <span v-if="apiEvent.end">&mdash;<br />{{ humanDateLong(apiEvent.end) }}</span>
            </p>
          </ion-card-title>
          <ion-accordion-group v-if="apiEvent.venue">
            <ion-accordion value="first" :toggle-icon="locationOutline" class="event-page-venue-wrap">
              <ion-item slot="header">
                <ion-label class="event-page-venue-title">{{ apiEvent.venue.title }}</ion-label>
              </ion-item>
              <div class="ion-padding event-page-venue-content" slot="content">
                <p>{{ apiEvent.venue.address }}</p>
                <ion-button v-if="apiEvent.venue.site_url" :href="apiEvent.venue.site_url">
                  <ion-icon slot="icon-only" :icon="globeOutline"></ion-icon>
                </ion-button>
                <ion-button v-if="apiEvent.venue.vk_url" :href="apiEvent.venue.vk_url">
                  <ion-icon slot="icon-only" :icon="logoVk"></ion-icon>
                </ion-button>
                <ion-button v-if="apiEvent.venue.tg_url" :href="apiEvent.venue.tg_url">
                  <ion-icon slot="icon-only" :icon="paperPlaneOutline"></ion-icon>
                </ion-button>
                <ion-button
                  :href="`geo:${apiEvent.venue.latitude},${apiEvent.venue.longitude}?q=${apiEvent.venue.address}`"
                >
                  <ion-icon slot="icon-only" :icon="locationOutline"></ion-icon>
                </ion-button>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </ion-card-header>
        <ion-card-content>
          <p v-html="apiEvent.desc ?? ''"></p>

          <template v-if="apiEvent.lineup">
            <p>&nbsp;</p>
            <p v-for="(image, key) in apiEvent.lineup" :key="key">
              <image-with-modal :img="image" />
            </p>
          </template>

          <template v-if="apiEvent.tickets_url">
            <p>&nbsp;</p>
            <ion-button expand="block" :href="apiEvent.tickets_url">
              <ion-icon slot="start" :icon="ticketOutline"></ion-icon>
              Купить билет
            </ion-button>
          </template>

          <template v-if="apiEvent.vk_url">
            <p>&nbsp;</p>
            <ion-button expand="block" :href="apiEvent.vk_url">
              <ion-icon slot="start" :icon="logoVk"></ion-icon>
              ВКонтакте
            </ion-button>
          </template>

          <p>&nbsp;</p>
          <ion-button expand="block" :href="`https://s.rock63.ru/calendar/${apiEvent.id}`">
            <ion-icon slot="start" :icon="calendarOutline"></ion-icon>
            Добавить в календарь
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Share } from "@capacitor/share";
import {
  IonAccordion,
  IonAccordionGroup,
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
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {
  arrowBack,
  calendarOutline,
  globeOutline,
  heart,
  heartOutline,
  locationOutline,
  logoVk,
  paperPlaneOutline,
  shareSocialOutline,
  ticketOutline,
} from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";

import { humanDateLong } from "@/helpers/formatter";
import { useAfishaStore } from "@/store/afisha";
import { useFavoriteStore } from "@/store/favorites";
import { APIEvent, APIEventExtended, canFavorite, extend } from "@/types/event";
import ImageWithModal from "@/views/components/ImageWithModal.vue";

const afishaStore = useAfishaStore();
const favoriteStore = useFavoriteStore();
const route = useRoute();
const router = useRouter();

const apiEvent: APIEventExtended | null = (function (): APIEventExtended | null {
  const e: APIEvent | null = afishaStore.getEventById(route.params.id);

  return e ? extend(e, afishaStore.venues) : null;
})();

function eventFavorite(): void {
  favoriteStore.toggle(apiEvent);
}

function eventShare(): void {
  const venueString = apiEvent.venue ? ` @ ${apiEvent.venue?.title}` : '';

  const options = {
    title: apiEvent.title,
    text: `${apiEvent.title}${venueString}\n${humanDateLong(apiEvent.start)}\n\n`,
    url: `${apiEvent.url}?utm_source=android&utm_term=share`,
  };

  Share.share(options);
}
</script>

<style scoped>
.event-page-title,
.event-page-date {
  text-align: center;
}
:deep(.event-page-venue-wrap .ion-accordion-toggle-icon) {
  position: absolute;
  right: 10px;
}
.event-page-venue-title {
  text-align: center;
}
.event-page-venue-content {
  text-align: center;
}
</style>
