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
      user: {},
      chat: ["a"],
      baseKey: this.$store.state.baseKey,
      encryptedKey: this.$store.state.encryptedKey
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
    });

    /* for reference */

    /*  console.log(this.user);
    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid); */

    /*    if (this.user) {
      docRef.get().then(function(doc) {
        console.log(doc.data());
      });
    } */
  },
  watch: {
    user: function() {
      /* for reference */
      let self = this;

      /* If the user is looged in try to get data */
      if (this.user.uid != undefined) {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(this.user.uid);
        docRef
          .get()
          .then(function(doc) {
            if (doc.data() != undefined) {
              self.$store.commit("setKey", doc.data().key);
            } else {
              console.log("data not found");
            }
          })
          .catch(function(error) {
            console.log(error, "nanka");
          });
      }

      if (this.input == undefined && this.user.uid != undefined) {
        console.log("input exists");
      }
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

    setKey(key) {
      this.$store.commit("setKey", key);
    },

    postInfo() {
      /*   firebase
        .database()
        .ref("userInfo")
        .push({
          key: "abcdef",
          message: "success hello manaki",
          name: this.user.displayName,
          id: this.user.uid
        }); */
      firebase
        .firestore()
        .collection("users")
        .doc("test")
        .set({
          name: "manaki2"
        });
    }
  }
};
</script>


