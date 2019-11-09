<template>
  <section id="hero" class="hero">
    <div class="hero__wrapper">
      <h2 class="hero__title">内緒にしたいメッセージを暗号化しよう！</h2>
      <img src="../assets/img/hero__img.png" alt class="hero__img mx-auto mt-10" />
      <p
        class="hero__txt 　max-w-sm mt-10"
      >アンゴウメッセは手軽にメッセージを暗号化できるサービスです。単純な暗号法を利用しているので大切な情報は内緒のままでお願いします</p>
      <button @click="doLogIn()" v-if="!user" class="hero__btn mt-16">ためしてみる</button>
      <button @click="jumpApp()" v-else class="hero__btn mt-16">さっそく暗号化する！</button>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState(["user"]),
  methods: {
    doLogIn() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    jumpApp() {
      this.$router.push("app");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>