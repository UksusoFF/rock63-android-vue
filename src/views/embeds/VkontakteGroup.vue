<template>
  <ion-button :href="`https://s.rock63.ru/calendar/${apiEvent.id}`">
    <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
    {{ vkGroupId }}
  </ion-button>
  <div :id="`vk-groups-${vkGroupId}`"></div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { calendarOutline } from "ionicons/icons";
import { onBeforeMount, PropType } from "vue";
import { onMounted, ref } from "vue";

import { injectVKOpenApi } from "@/helpers/vk";
import { APIEventExtended } from "@/types/event";

const props = defineProps({
  apiEvent: {
    type: Object as PropType<APIEventExtended>,
    required: true,
  },
});

const vkGroupId = ref(props.apiEvent?.vk_id);

onBeforeMount(() => {
  const apiScript = document.createElement("script");
  apiScript.setAttribute("src", "https://vk.com/js/api/openapi.js?168");
  document.head.appendChild(apiScript);
});

onMounted(() => {
  injectVKOpenApi().then(() => {
    VK.Widgets.Group(
      `vk-groups-${vkGroupId.value}`,
      {
        mode: 1,
        width: "auto",
        height: 200,
        no_cover: 1,
        color1: "1e1e1e", //--ion-card-background: #1e1e1e;
        color2: "ffffff",
        color3: "bd0000",
      },
      parseInt(vkGroupId.value),
    );
  });
});
</script>

<style scoped></style>
