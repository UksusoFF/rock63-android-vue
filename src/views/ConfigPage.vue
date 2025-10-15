<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Настройки</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="router.back">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle justify="space-between" :checked="configStore.isThemeDark" @ionChange="toggleTheme">
            Тёмная тема
          </ion-toggle>
        </ion-item>
      </ion-list>

      <ion-card>
        <ion-card-content>
          <p style="text-align: center">v{{ version }}</p>
          <p>&nbsp;</p>
          <div style="text-align: center">
            <ion-button href="https://vk.com/rock63">
              <ion-icon slot="icon-only" :icon="logoVk"></ion-icon>
            </ion-button>
            <ion-button href="https://t.me/rock63ru">
              <ion-icon slot="icon-only" :icon="paperPlaneOutline"></ion-icon>
            </ion-button>
          </div>
          <p>&nbsp;</p>
          <ion-button expand="block" href="https://rock63.ru/contacts">Контакты</ion-button>
          <p>&nbsp;</p>
          <ion-button
            expand="block"
            href="https://github.com/UksusoFF/rock63-android-vue/blob/master/docs/privacy-policy.md"
          >
            Политика конфиденциальности
          </ion-button>
          <p>&nbsp;</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { App } from "@capacitor/app";
import { AppInfo } from "@capacitor/app/dist/esm/definitions";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/vue";
import { arrowBack, logoVk, paperPlaneOutline } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useConfigStore } from "@/store/config";

const configStore = useConfigStore();

const router = useRouter();

const version = ref("");

App.getInfo().then((info: AppInfo) => {
  version.value = info.version;
});

function toggleTheme(): void {
  configStore.toggle();
}
</script>

<style scoped></style>
