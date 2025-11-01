<template>
  <div :id="`open-modal-${modalId}`" class="image-with-modal" :style="`background-image: url(${img.img_o})`"></div>

  <ion-modal ref="modal" :trigger="`open-modal-${modalId}`">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="confirm">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-img :src="img.img_o"></ion-img>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonModal, IonToolbar } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { PropType, ref } from "vue";

import { hashString } from "@/helpers/hash";
import { APIImage } from "@/types/image";

const props = defineProps({
  img: {
    type: Object as PropType<APIImage>,
    required: true,
  },
});

const modalId = hashString(props.img.img_o);

const modal = ref();

const confirm = () => modal.value.$el.dismiss(null, "cancel");
</script>

<style scoped>
.image-with-modal {
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
}
</style>
