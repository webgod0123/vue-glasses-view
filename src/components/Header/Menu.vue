<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const fetchGlasses = (url: string, title: string) => {
  const fetchUrl = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${url}/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[Frame_variant_home_trial_available][]=false`;
  store.commit("setInitUrl", { url: fetchUrl, title });
  store.commit("fetchGlasses", `${fetchUrl}&page[limit]=12&page[number]=1&=`);
};
</script>

<template>
  <div class="menu-bar">
    <div class="menu-btn">
      <a>Menu</a>
      <ul>
        <li class="menu-item">
          <a>Spectacles</a>
          <svg width="13" height="13" viewBox="0 0 81.601 90.666">
            <path
              d="M91.2,53.333,9.6,98.666V8Z"
              transform="translate(-9.6 -8)"
            />
          </svg>
          <ul class="nested-submenu">
            <li
              class="menu-item"
              @click="fetchGlasses('spectacles-women', 'Spectacles Women')"
            >
              <a>Women</a>
            </li>
            <li
              class="menu-item"
              @click="fetchGlasses('spectacles-men', 'Spectacles Men')"
            >
              <a>Men</a>
            </li>
          </ul>
        </li>
        <li class="menu-item">
          <a>Sunglasses</a>
          <svg width="13" height="13" viewBox="0 0 81.601 90.666">
            <path
              d="M91.2,53.333,9.6,98.666V8Z"
              transform="translate(-9.6 -8)"
            />
          </svg>
          <ul class="nested-submenu">
            <li
              class="menu-item"
              @click="fetchGlasses('sunglasses-women', 'Sunglasses Women')"
            >
              <a>Women</a>
            </li>
            <li
              class="menu-item"
              @click="fetchGlasses('sunglasses-men', 'Sunglasses Men')"
            >
              <a>Men</a>
            </li>
          </ul>
        </li>
        <li class="menu-item"><a>Home Try On</a></li>
        <li class="menu-item"><a>Free Eye Test</a></li>
      </ul>
    </div>

    <img src="../../assets/logo.png" class="logo" />
  </div>
</template>

<style>
.menu-bar {
  border: 1px solid black;
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

a {
  text-decoration: none;
  font-size: 18px;
  color: black;
  cursor: hand;
}

.menu-btn {
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  padding: 0 30px;
  cursor: pointer;
}

.menu-btn:hover > a {
  text-decoration: underline !important;
}

.menu-bar ul > li {
  display: flex;
  align-items: center;
  transition: all 0.3s;
  width: 100%;
  padding: 0 20px;
  cursor: pointer;
  padding: 15px 20px;
  justify-content: space-between;
}

.menu-btn ul {
  position: absolute;
  top: -1px;
  height: calc(100vh - 59px) !important;
  background: white;
  left: -350px;
  width: 350px;
  display: block !important;
  transition: 0.3s;
  border: 1px solid black;
}

.menu-btn > ul {
  top: 100%;
}

.menu-btn:hover > ul {
  left: -1px;
}

ul li:hover > ul.nested-submenu {
  left: 100%;
}

.nested-submenu {
  top: -1px;
  left: -1px;
  background: white;
  z-index: -1;
}

ul > li {
  border-bottom: 1px solid black;
}

ul > li:hover {
  background: black;
}

ul > li:hover > a {
  color: white !important;
}

ul li > a {
  text-transform: uppercase;
  font-weight: bold;
}

.menu-item:hover > svg {
  fill: white;
}

.logo {
  width: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
