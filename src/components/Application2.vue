<template>
  <section class="app">
    <div class="app__wrapper">
      <h2 class="app__title">解読研究所</h2>
      <div class="app__messages">
        <div class="app__message flex item-center justify-between mt-20">
          <div class="app__guide">
            <img src="../assets/img/app__icon1.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt">
              解読研究所へようこそ！ここではメッセージの解読を行っているぞ！
              <br />まずは解読したいメッセージの
              <span style="color:red">鍵</span>を教えてね！
            </p>
          </div>
        </div>

        <div v-if="this.validKey" class="app__reply flex item-center justify-between mt-10">
          <input v-model="message" placeholder="ここに解読したいメッセージを入力" class="app__user-reply" />

          <div class="app__user">
            <img :src="user.photoURL" alt class="app__icon rounded-full" />
            <p class="app__user-name mt2">{{user.displayName}}</p>
          </div>
        </div>

        <div v-else class="app__reply flex items-baseline justify-between mt-10">
          <input v-model="key" placeholder="ここに鍵を入力してね！" class="app__user-reply" />

          <div class="app__user app__submit">
            <!--   <img :src="user.photoURL" alt class="app__icon rounded-full" />
            <p class="app__user-name mt2">{{user.displayName}}</p>-->
            <button @click="checkKey" class="app__btn">
              <i class="fas fa-paper-plane mr-2"></i>送信
            </button>
          </div>
        </div>

        <!-- End -->
        <div v-if="validKey" class="app__message flex item-center justify-between mt-10">
          <div class="app__guide">
            <img src="../assets/img/app__icon1.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン{{user.displayName}}</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt" v-if="message">{{this.decrypt(this.message)}}</p>
            <p class="app__message-txt" v-else>暗号化は僕に任せて！</p>
          </div>
        </div>

        <!-- end -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { log } from "util";
import firebase from "firebase";

export default {
  computed: mapState(["user", "messages", "keyInfo"]),

  data: function() {
    return {
      message: "",
      decryptKey: [],
      key: "",
      validKey: false
    };
  },

  methods: {
    //if user isn't logged in return them to home page
    checkLoginInfo() {
      if (this.user == null) {
        this.$router.push({ name: "home" });
      }
    },

    //check if the key exists in collection
    checkKey() {
      let self = this;
      const docRef = firebase
        .firestore()
        .collection("keys")
        .doc(this.key);

      docRef.get().then(function(doc) {
        if (doc.data() != undefined) {
          self.validKey = true;
          self.decryptKey = doc.data().key;
        }
      });
    },

    decrypt(message) {
      let baseKey = Array.from(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz"
      );

      let messageChar = "";
      for (let i = 0; i < message.length; i++) {
        messageChar += baseKey[this.decryptKey.indexOf(message.charAt(i))];
      }

      return messageChar;
    }
  },
  created() {
    this.checkLoginInfo();
  },
  watch: {
    user: function() {
      this.checkLoginInfo();
    }
  }
};
</script>

<style scoped>
.app__message-content {
  margin-bottom: 50px;
}

.app__user-reply {
  margin-bottom: 50px;
}

.app__submit {
  align-items: baseline;
}

.app__btn {
  margin-left: -24px;
  font-size: 1.7rem;
  background-color: #6c63ff;
  padding: 0.8rem 1.4rem;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  position: relative;
  transition: 0.3s;
}
</style>