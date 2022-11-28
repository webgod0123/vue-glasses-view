import type { Filter, Glass, State } from "@/types";

// initial state
const state: State = {
  glasses: [],
  filters: [],
  totalCount: 0,
  pageIndex: 1,
  pageNum: 0,
  pageTitle: "Spectacles Women",
  url: "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-women/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[Frame_variant_home_trial_available][]=false",
  initUrl:
    "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-women/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[Frame_variant_home_trial_available][]=false",
};

const mutations = {
  fetchGlasses(state: State, url: string) {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const arr: Glass[] = [];
          result.glasses.forEach((item: any) => {
            arr.push({
              id: item.id,
              name: item.name,
              media: item.glass_variants[0].media,
              price: item.glass_variants[0].price,
            });
          });

          const totalCount = result.meta.total_count;

          state["glasses"] = arr;
          state["totalCount"] = totalCount;
          state["pageNum"] = Math.ceil(totalCount / 12);
        }
      });
  },
  scrollFetchGlasses(state: State, url: string) {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const arr: Glass[] = [];
          result.glasses.forEach((item: any) => {
            arr.push({
              id: item.id,
              name: item.name,
              media: item.glass_variants[0].media,
              price: item.glass_variants[0].price,
            });
          });

          state["glasses"] = state["glasses"].concat(arr);
        }
      });
  },
  editFilters(state: State, filterOption: Filter) {
    let filters = [...state.filters];
    const filter = filters.find(
      (item: any) =>
        item.value === filterOption.value && filterOption.type === item.type
    );

    if (filter) {
      filters = filters.filter(
        (item: any) => item.value !== filterOption.value
      );
    } else {
      filters.push({
        type: filterOption.type,
        value: filterOption.value,
      });
    }

    state.filters = filters;
  },
  setPageIndex(state: State, index: number) {
    state["pageIndex"] = index;
  },
  setFetchUrl(state: State, url: string) {
    state["url"] = url;
  },
  setInitUrl(state: State, { url, title }: { url: string; title: string }) {
    state["url"] = url;
    state["initUrl"] = url;
    state["pageIndex"] = 1;
    state["filters"] = [];
    state["pageTitle"] = title;
  },
  clearFilters(state: State) {
    state["filters"] = [];
    state["url"] = state["initUrl"];
    state["pageIndex"] = 1;
  },
};

export default {
  state,
  mutations,
};
