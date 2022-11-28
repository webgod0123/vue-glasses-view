<script setup lang="ts">
import type { Media } from "@/types";
import { ref } from "vue";
import type { PropType } from "vue";

const activeIndex = ref(0);

const props = defineProps({
  media: {
    type: Array as PropType<Media[]>,
    default: [],
  },
});

const changeIndex = (value: number) => {
  const mediaLength = props.media.length;
  let index = activeIndex.value;
  index += value;
  if (index < 0) activeIndex.value = mediaLength - 1;
  else activeIndex.value = index % mediaLength;
};
</script>

<template>
  <div class="slide-container" v-if="media.length > 0">
    <div
      v-for="(item, index) in media"
      :key="index"
      :class="{ 'slide-item': true, active: activeIndex === index }"
    >
      <img :src="item.url" />
    </div>
    <div class="slide-action-prev slide-action" @click="changeIndex(-1)" />
    <div class="slide-action-next slide-action" @click="changeIndex(+1)" />
  </div>
</template>

<style>
.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  animation-name: active;
  animation-duration: 0.5s;
}

.slide-item.active {
  display: flex;
}

.slide-item img {
  width: 100%;
  height: 100%;
}

.slide-action {
  position: absolute;
  width: 20%;
  height: 100%;
}

.slide-action-prev {
  left: 0;
  cursor: url("../assets/icons/arrow-left.png"), auto;
}

.slide-action-next {
  right: 0;
  cursor: url("../assets/icons/arrow-right.png"), auto;
}

@keyframes active {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>