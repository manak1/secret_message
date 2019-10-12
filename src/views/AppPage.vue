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
import firebase from "firebase";

export default {
  components: {
    Footer,
    Header,
    App
  },
  data() {
    return {
      user: {},
      chat: [],
      input: ""
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : false;
      this.$store.commit("updateloginInfo", user);

      /*       const ref_message = firebase.database().ref("message"); */
    });
    if (!this.user) {
      console.log("router challenge");
      this.$router.push({ name: "home" });
    }
  },

  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    doLogout() {
      firebase.auth().signOut();
    },

    checkLoggedIn() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user ? user : false;
      });
      console.log(this.user);
    },

    postInfo() {
      firebase
        .database()
        .ref("test")
        .push({
          key: "abcdef",
          message: "success hello manaki",
          name: this.user.displayName,
          id: this.user.uid
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>