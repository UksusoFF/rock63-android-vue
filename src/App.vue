<template>
  <ion-app>
    <ion-router-outlet />
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>rock63.ru</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list lines="none">
          <ion-menu-toggle>
            <ion-item button @click="configClick">
              <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
              <ion-label>Настройки</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
        <ion-list lines="none">
          <ion-list-header>
            <ion-label>Новости</ion-label>
          </ion-list-header>
          <news-list />
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

import { useConfigStore } from "@/store/config";
import NewsList from "@/views/news/NewsList.vue";

const configStore = useConfigStore();

const router = useRouter();

configStore.init();

function configClick(): void {
  router.push("/config");
}
</script>
