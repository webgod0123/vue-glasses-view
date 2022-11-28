<script setup lang="ts">
import type { Filter, FilterOption } from "@/types";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ColorFilters, ShapeFilters } from "@/types/constants";

const filterOption = ref<FilterOption>("color");
const isOpen = ref<boolean>(false);

const store = useStore();

const url = computed(function () {
  return store.state.glasses.initUrl;
});

const totalCount = computed(function () {
  return store.state.glasses.totalCount;
});

const pageTitle = computed(function () {
  return store.state.glasses.pageTitle;
});

const filters = computed(function () {
  return store.state.glasses.filters;
});

const openFilterField = (option: FilterOption) => {
  if (filterOption.value === option) {
    if (!isOpen.value) isOpen.value = true;
    else isOpen.value = false;
  } else {
    if (!isOpen.value) isOpen.value = true;
    filterOption.value = option;
  }
};

const addFilter = (value: string, type: FilterOption) => {
  store.commit("editFilters", { value, type });
  store.commit("setPageIndex", 1);

  let fetchUrl = url.value;
  filters.value.forEach((item: Filter) => {
    const filterStr =
      item.type === "color"
        ? "glass_variant_frame_variant_colour_tag_configuration_names"
        : "glass_variant_frame_variant_frame_tag_configuration_names";

    fetchUrl += `&filters[${filterStr}][]=${item.value}`;
  });

  store.commit("fetchGlasses", `${fetchUrl}&page[limit]=12&page[number]=1&=`);
  store.commit("setFetchUrl", fetchUrl);
};

const existFilter = (value: string, type: FilterOption) => {
  const filter = filters.value.find(
    (item: Filter) => item.value === value && type === item.type
  );

  return !!filter;
};

const clearFilters = () => {
  isOpen.value = false;
  store.commit("clearFilters");
  store.commit("fetchGlasses", `${url.value}&page[limit]=12&page[number]=1&=`);
};
</script>

<template>
  <div>
    <div class="filter-container">
      <div class="filter-col" />
      <div class="filter-col page-title">
        <h2>{{ pageTitle }}</h2>
      </div>
      <div class="filter-col filter-options-selector">
        <div class="filter-label" @click="openFilterField('color')">Colour</div>
        <div class="filter-label" @click="openFilterField('shape')">Shape</div>
      </div>
    </div>
    <div :class="{ 'filter-field': true, active: isOpen }">
      <div>
        <div
          class="filter-color filter-options"
          v-if="filterOption === 'color'"
        >
          <div
            class="filter-option"
            v-for="(color, index) in ColorFilters"
            @click="addFilter(color.value, 'color')"
            :key="index"
          >
            <div
              :class="{
                'filter-color-option-shape': true,
                active: existFilter(color.value, 'color'),
              }"
            >
              <img :src="color.url" />
            </div>
            <span>{{ color.name }}</span>
          </div>
        </div>
        <div
          class="filter-shape filter-options"
          v-if="filterOption === 'shape'"
        >
          <div
            :class="{
              'filter-option filter-option-shape': true,
              active: existFilter(shape.value, 'shape'),
            }"
            v-for="(shape, index) in ShapeFilters"
            :key="index"
            @click="addFilter(shape.value, 'shape')"
          >
            {{ shape.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter-result" v-if="filters.length > 0">
      <div class="filters-container filter-col">
        <div
          class="filter-option selected-filter"
          v-for="(filter, index) in filters"
          @click="addFilter(filter.value, filter.type)"
          :key="index"
        >
          {{ filter.value }}
        </div>
      </div>
      <div class="filter-result-length filter-col">
        {{ totalCount }} Results Found
      </div>
      <div @click="clearFilters()" class="filter-col filter-clear">
        Clear Filters
      </div>
    </div>
  </div>
</template>

<style>
.filter-container {
  display: flex;
  height: 60px;
  flex-wrap: wrap;
  background: white;
  margin-top: 60px;
  border-left: 1px solid black;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.page-title h2 {
  font-weight: bold;
  text-transform: uppercase;
}

.filter-col {
  width: calc(100% / 3);
  height: 100%;
  border-right: 1px solid black;
  display: flex;
  flex-wrap: wrap;
}

.filter-label {
  text-transform: uppercase;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 40px;
  border-right: 1px solid black;
  cursor: pointer;
}

.filter-field {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;
}

.filter-field.active {
  max-height: 200px;
}

.filter-field > div {
  background: white;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 20px 0;
}

.filter-options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.filter-option {
  display: flex;
  cursor: pointer;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.filter-color-option-shape {
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
}

.filter-color-option-shape.active,
.filter-option:hover .filter-color-option-shape {
  border: 1px solid black;
}

.filter-color-option-shape img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.filter-option-shape.active {
  text-decoration: underline;
}

.filter-result {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  text-transform: uppercase;
}

.filter-result > .filter-col {
  border: none;
}

.filter-result-length {
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.filter-clear {
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  cursor: pointer;
  padding: 0 20px;
}

.filters-container {
  display: flex;
  align-items: center;
  padding: 15px 0px;
  flex-wrap: wrap;
}

.selected-filter {
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .filter-container {
    display: block;
    height: auto;
  }

  .filter-container .page-title {
    padding: 15px 20px;
    border-bottom: 1px solid black;
  }

  .filter-label {
    padding: 15px 20px;
  }

  .filter-result {
    display: block;
  }

  .filter-col {
    width: 100%;
  }

  .filter-clear {
    justify-content: center;
  }

  .filter-clear,
  .filter-result-length {
    padding: 15px 20px;
  }

  .filter-label {
    text-align: center;
    display: flex;
    justify-content: center;
    width: 50%;
  }

  .filter-label:last-child {
    border: none;
  }
}
</style>