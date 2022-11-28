<script setup lang="ts">
import type { Glass } from "@/types";
import type { PropType } from "@vue/runtime-core";
import Slider from "./Slider.vue";

const props = defineProps({
  glass: {
    type: Object as PropType<Glass>,
  },
});
</script>

<template>
  <div class="glass-card" v-if="glass">
    <div class="glass-content">
      <div class="glass-name">
        {{ glass.name }}
      </div>
    </div>

    <Slider :media="glass.media" />
  </div>
</template>

<style>
.glass-card {
  width: calc(100% / 3);
  display: flex;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  cursor: pointer;
  aspect-ratio: 4/3;
}

.glass-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glass-name {
  font-size: 20px;
  padding: 15px;
  text-align: center;
  z-index: 1;
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
}

.glass-card img {
  width: 100%;
}

@media (max-width: 900px) {
  .glass-card {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .glass-card {
    width: 100%;
  }
}
</style>