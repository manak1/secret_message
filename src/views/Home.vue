<template>
  <div>
    <Hero />
    <About />
    <Cta />
    <!-- 
    <div class="d-flex">
      <button @click="doLogin">ログインテスト</button>
      <button @click="postInfo">データ挿入</button>
      <button @click="doLogout">ログアウト</button>
    </div>
    <h2>{{this.user.displayName}}</h2>

    <button @click="checkLoggedIn">チェックログインステート</button>-->
    <h2>{{this.keyInfo}}</h2>
    <Footer />
  </div>
</template>
<script>
import "../assets/css/tailwind.css";
import "../assets/css/index.css";
import About from "@/components/About.vue";
import Hero from "@/components/Hero.vue";
import Cta from "@/components/Cta.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import firebase from "firebase";
import { mapState } from "vuex";
import Preloader from '@/components/Preloader.vue';

export default {
  components: {
    Hero,
    About,
    Cta,
    Footer,
    Header
  },
  data() {
    return {
      chat: ["a"],
      baseKey: [
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz"
      ]
    };
  },
  computed: mapState(["user", "keyInfo"])
};
</script>


