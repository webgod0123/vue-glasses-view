import { createStore } from "vuex";
import Glasses from "./modules/Glasses";

export const store = createStore({
  modules: {
    glasses: Glasses,
  },
});
