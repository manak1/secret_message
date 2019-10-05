<template>
  <div>
    <Header />

    <App />
    <Footer />
  </div>
</template>

<script>
import "../assets/css/tailwind.css";
import "../assets/css/index.css";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import App from "@/components/Application.vue";
export default {
  components: {
    Footer,
    Header,
    App
  }
};
</script>

<style lang="scss" scoped>
</style>