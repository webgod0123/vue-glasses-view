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
      <ul class="main-menu">
        <li class="menu-item">
          <div class="menu-item-label">
            Spectacles
            <svg width="13" height="13" viewBox="0 0 81.601 90.666">
              <path
                d="M91.2,53.333,9.6,98.666V8Z"
                transform="translate(-9.6 -8)"
              />
            </svg>
          </div>

          <ul class="nested-submenu">
            <li
              class="menu-item"
              @click="fetchGlasses('spectacles-women', 'Spectacles Women')"
            >
              <a class="menu-item-label">Women</a>
            </li>
            <li
              class="menu-item"
              @click="fetchGlasses('spectacles-men', 'Spectacles Men')"
            >
              <a class="menu-item-label">Men</a>
            </li>
          </ul>
        </li>
        <li class="menu-item">
          <div class="menu-item-label">
            Sunglasses
            <svg width="13" height="13" viewBox="0 0 81.601 90.666">
              <path
                d="M91.2,53.333,9.6,98.666V8Z"
                transform="translate(-9.6 -8)"
              />
            </svg>
          </div>

          <ul class="nested-submenu nested-submenu-second">
            <li
              class="menu-item"
              @click="fetchGlasses('sunglasses-women', 'Sunglasses Women')"
            >
              <a class="menu-item-label">Women</a>
            </li>
            <li
              class="menu-item"
              @click="fetchGlasses('sunglasses-men', 'Sunglasses Men')"
            >
              <a class="menu-item-label">Men</a>
            </li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-item-label">Home Try On</a></li>
        <li class="menu-item"><a class="menu-item-label">Free Eye Test</a></li>
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

.menu-item-label {
  display: flex;
  align-items: center;
  transition: all 0.3s;
  width: 100%;
  padding: 0 20px;
  cursor: pointer;
  padding: 15px 20px;
  justify-content: space-between;
}

ul {
  top: -1px;
  background: white;
  width: 350px;
  display: block !important;
  transition: 0.3s;
}

.main-menu,
.nested-submenu {
  position: absolute;
  height: calc(100vh - 59px);
  left: -351px;
}

.main-menu {
  top: 100%;
  border: 1px solid black;
}

.menu-btn:hover .main-menu {
  left: -1px;
}

.menu-item:hover > .nested-submenu {
  left: 100%;
}

.nested-submenu {
  top: -1px;
  left: -1px;
  background: white;
  z-index: -1;
  border: 1px solid black;
}

.nested-submenu-second {
  top: calc(-100% - 1px) !important;
}

.menu-item-label {
  border-bottom: 1px solid black;
}

.menu-item:hover > .menu-item-label {
  background: black;
  color: white;
}

.menu-item-label {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.menu-item:hover svg {
  fill: white;
}

.logo {
  width: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 600px) {
  .menu-item {
    display: block !important;
  }

  .nested-submenu {
    height: auto;
    top: 100%;
    position: unset;
    margin-left: -1px;
    margin-top: -1px;
    border-bottom: none;
    max-height: 0;
    transition: 0.3s;
    overflow: hidden;
  }

  .menu-item:hover .nested-submenu {
    max-height: 200px;
  }

  ul li:hover > ul.nested-submenu {
    left: -1px;
  }
}
</style>
