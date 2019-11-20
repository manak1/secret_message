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
import App2 from "@/components/Application2.vue";
import firebase from "firebase";

export default {
  components: {
    Footer,
    Header,
    App,
    App2
  }
};
</script>
