<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import Glass from "./Glass.vue";

const store = useStore();

const pageIndex = computed(function () {
  return store.state.glasses.pageIndex;
});

const glasses = computed(function () {
  return store.state.glasses.glasses;
});

const url = computed(function () {
  return store.state.glasses.url;
});

const pageNum = computed(function () {
  return store.state.glasses.pageNum;
});

const getNextPage = () => {
  window.onscroll = () => {
    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow && pageNum.value > pageIndex.value) {
      const index = pageIndex.value + 1;
      store.commit("scrollFetchGlasses", getFetchUrl(index));
      store.commit("setPageIndex", index);
    }
  };
};

const getFetchUrl = (index: number) => {
  return `${url.value}&page[limit]=12&page[number]=${index}&=`;
};

onMounted(() => getNextPage());

onBeforeMount(() => {
  store.commit("fetchGlasses", getFetchUrl(pageIndex.value));
});
</script>

<template>
  <div class="container">
    <Glass v-for="glass in glasses" :key="glass.id" :glass="glass" />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid black;
  border-left: 1px solid black;
}
</style>
