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
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz123456789"
      ],
      user: this.$store.state.user,
      keyInfo: this.$store.state.keyInfo
    };
  },
  created() {
    //update user info
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
            //if the key info exists
            if (doc.data() != undefined) {
              console.log("send keyinfo data");
              self.$store.commit("setKeyInfo", doc.data());
            }
            //if its useres initall login
            else {
              console.log("set to initial");
              self.$store.commit("setKeyInfo", "initial");
              console.log(self.$store.state.keyInfo);
            }
          })
          /* After the data hasbeen changed. */
          .then(function() {
            if (self.$store.state.keyInfo == "initial" && self.user.uid != "") {
              //create a new key
              console.log(
                self.$store.state.keyInfo,
                "isnt this what you need?"
              );

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

    /* 
    keyInfo: function() {
      console.log("key info data changed", this.keyInfo);
    } */
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

    /* 
    setKey(key) {
      this.$store.commit("setKeyInfo", key);
    },
*/

    //randomly shuffle the key table and return it
    //fisher-yates shuffle algorithm used

    createNewKey() {
      let a =
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz123456789";
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

