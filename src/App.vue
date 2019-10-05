<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import "./assets/css/tailwind.css";
import "./assets/css/index.css";

import Header from "@/components/Header.vue";

export default {
  components: { Header }
};
</script>

