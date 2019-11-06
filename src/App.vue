<template>
  <div id="app">
    <Preloader v-if="show"></Preloader>
    <Header />
    <router-view />
  </div>
</template>

<script>
import "./assets/css/tailwind.css";
import "./assets/css/index.css";
import firebase from "firebase";
import Header from "@/components/Header.vue";
import Preloader from "@/components/Preloader.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Header, Preloader },
  computed: mapState(["messages"]),
  data() {
    return {
      baseKey: [
        "いz7んhつうvびwろおめごgぱcぉ6ひあじわぞeぐfらnxざaやもmとちょrどだま8oよたぃねぇずlゅぺけでふほぶはぼぴぽすさぎづき2ぅへむそっぷ14のjゆりてげdsがゃにぬくpぢえtべ5なれかyしbiをぜぁこみせばるk3uq9"
      ],
      user: this.$store.state.user,
      keyInfo: this.$store.state.keyInfo,
      show: false
    };
  },
  created() {
    //update user info
    this.showToggle();
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : false;
      this.$store.commit("updateloginInfo", user);
    });
  },

  mounted() {},
  watch: {
    user: function() {
      /* To access variables in vue*/
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
            //if the key info exists
            if (doc.data() != undefined) {
              self.$store.commit("setKeyInfo", doc.data());
            }
            //if its useres initall login
            else {
              self.$store.commit("setKeyInfo", "initial");
            }
          })

          /* After the data hasbeen changed. */
          .then(function() {
            if (self.$store.state.keyInfo == "initial" && self.user.uid != "") {
              //create a new keu
              const newKey = self.createNewKey();
              //create a  new code
              const newCode = Math.random()
                .toString(36)
                .slice(-4);

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
            console.log(error, "something wrong happened");
          });
      }

      //if its users initial login
    }
  },
  methods: {
    /* Show user login scren */
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },

    /* Log out user update user data in store */
    doLogout() {
      console.log("i will sign out");
      firebase.auth().signOut();
      this.$store.commit("setKeyInfo", " ");
    },

    /* Check if user has logged in or not */
    checkLoggedIn() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user ? user : false;
      });
    },

    showToggle() {
      window.onload = function() {
        this.show = false;
      };
    },
    /* 
    setKey(key) {
      this.$store.commit("setKeyInfo", key);
    },
*/

    //randomly shuffle the key table and return it
    //fisher-yates shuffle algorithm used
    createNewKey() {
      let a = Array.from(this.baseKey[0]);
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
</script>

