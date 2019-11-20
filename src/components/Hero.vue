<template>
  <section id="hero" class="hero">
    <div class="hero__wrapper">
      <h2 class="hero__title">内緒にしたいメッセージを暗号化しよう！</h2>
      <img src="../assets/img/hero__img.png" alt class="hero__img mx-auto mt-10" />
      <p
        class="hero__txt 　max-w-sm mt-10"
      >アンゴウメッセは手軽にメッセージを暗号化できるサービスです。単純な暗号法を利用しているので大切な情報は内緒のままでお願いします</p>
      <button @click="doLogIn()" v-if="!user" class="hero__btn mt-16">ためしてみる</button>
      <button @click="jumpApp()" v-else class="hero__btn mt-16 mr-2">さっそく暗号化する！</button>
      <a @click.prevent="testLogin()" v-if="!user" class="hero__test-login">デモを試してみる(企業様向け)</a>
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
    },

    testLogin() {
      const testUser = {
        displayName: "テストペンギン",
        photoURL:
          "https://pbs.twimg.com/profile_images/1132315068274581505/mglWS6sO_normal.jpg",
        uid: "thisisatestaccount"
      };

      this.$store.commit("updateTestLogin", true);
      this.$store.commit("updateloginInfo", testUser);
    }
  }
};
</script>
