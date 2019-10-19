<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import "./assets/css/tailwind.css";
import "./assets/css/index.css";
import firebase from "firebase";
import Header from "@/components/Header.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Header },
  computed: mapState(["messages"]),
  data() {
    return {
      chat: ["a"],
      baseKey: [
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz"
      ],
      user: this.$store.state.user,
      keyInfo: this.$store.state.keyInfo
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : false;
      this.$store.commit("updateloginInfo", user);
    });
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
              console.log("send keyinfo data");
              self.$store.commit("setKeyInfo", doc.data());
            } else {
              console.log("set to initial");
              self.$store.commit("setKeyInfo", "initial");
              console.log(self.$store.state.keyInfo);
            }
          })
          .then(function() {
            console.log(self.$store.state.keyInfo, "wassaaaaa");
            if (self.$store.state.keyInfo == "initial" && self.user.uid != "") {
              //create a new key
              console.log(
                self.$store.state.keyInfo,
                "isnt this what you need?"
              );

              console.log("first time");

              const newKey = self.createNewKey();
              //create a  new code
              const newCode = Math.random()
                .toString(36)
                .slice(-3);

              firebase
                .firestore()
                .collection("users")
                .doc(self.user.uid)
                .set({
                  name: self.user.displayName,
                  key: newKey,
                  code: newCode
                });

              firebase
                .firestore()
                .collection("keys")
                .doc(newCode)
                .set({
                  key: newKey
                });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      //if its users initial login
    }

    /* 
    keyInfo: function() {
      console.log("key info data changed", this.keyInfo);
    } */
  },
  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    checkData() {
      console.log(this.keyInfo);
    },
    doLogout() {
      console.log("i will sign out");
      firebase.auth().signOut();
      this.$store.commit("setKeyInfo", " ");
    },

    checkLoggedIn() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user ? user : false;
      });
    },

    setKey(key) {
      this.$store.commit("setKeyInfo", key);
    },

    //fisher-yates shuffle algorithm
    createNewKey() {
      let a =
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz";
      a = Array.from(a);
      console.log(a);
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
  }
};

/* 

*/
</script>

