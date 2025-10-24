<template>
  <ion-item
    button
    lines="full"
    v-for="article in newsStore.articles"
    :key="article.id"
    :href="`${article.url}?utm_source=android&utm_term=menu`"
  >
    <ion-thumbnail slot="end" v-if="article.img">
      <img :alt="article.title" :src="article.img.img_s" />
    </ion-thumbnail>
    <ion-label>{{ article.title }}</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonThumbnail } from "@ionic/vue";

import { useNewsStore } from "@/store/news";

const newsStore = useNewsStore();

newsStore.fetch();
</script>
