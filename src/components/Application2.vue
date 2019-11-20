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

        <transition name="fade">
          <div v-if="this.validKey" class="app__reply flex item-center justify-between mt-10">
            <input v-model="message" placeholder="ここに解読したいメッセージを入力" class="app__user-reply" />

            <div class="app__user">
              <img :src="user.photoURL" alt class="app__icon rounded-full" />
              <p class="app__user-name mt2">{{user.displayName}}</p>
            </div>
          </div>
        </transition>

        <div
          v-if="!validKey"
          class="app__reply app__reply2 flex items-baseline justify-center mx-auto mt-10"
        >
          <input
            type="password"
            v-model="key"
            placeholder="ここに鍵を入力してね！"
            class="app__user-reply app__input"
          />

          <div class="app__user app__submit">
            <button @click="checkKey" class="app__btn">
              <i class="fas fa-paper-plane mr-2"></i>送信
            </button>
          </div>
        </div>

        <transition name="fade">
          <div v-if="wrongKey" class="app__message flex item-center justify-between mt-20">
            <div class="app__guide">
              <img src="../assets/img/app__icon1.svg" class="app__icon rounded-full" />
              <p class="app__guide-name mt-2">賢いペンギン</p>
            </div>

            <div class="app__message-content">
              <p class="app__message-txt">
                どうやら鍵が間違っているみたいだ！
                <br />入力ミスをしていないか確認してみてね！
              </p>
            </div>
          </div>
        </transition>
        <!-- End -->
        <transition name="fade">
          <div v-if="validKey" class="app__message flex item-center justify-between mt-10">
            <div class="app__guide">
              <img src="../assets/img/app__icon1.svg" class="app__icon rounded-full" />
              <p class="app__guide-name mt-2">賢いペンギン</p>
            </div>

            <div class="app__message-content">
              <p class="app__message-txt" v-if="message">{{this.decrypt(this.message)}}</p>
              <p class="app__message-txt" v-else>解読は僕に任せて！</p>
            </div>
          </div>
        </transition>

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
      validKey: false,
      wrongKey: false,
      baseKey:
        "いz7んhつうvびwろおめごgぱcぉ6ひあじわぞeぐfらnxざaやもmとちょrどだま8oよたぃねぇずlゅぺけでふほぶはぼぴぽすさぎづき2ぅへむそっぷ14のjゆりてげdsがゃにぬくpぢえtべ5なれかyしbiをぜぁこみせばるk3uq9"
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
          self.wrongKey = false;
        } else {
          self.wrongKey = true;
        }
      });
    },
    //decrypt message based on the key
    decrypt(message) {
      let baseKey = Array.from(this.baseKey);
      console.log(this.decryptKey.toString(), "testing");
      let messageChar = "";
      let decoded = "";
      for (let i = 0; i < message.length; i++) {
        decoded = baseKey[this.decryptKey.indexOf(message.charAt(i))];
        if (decoded == undefined) {
          messageChar += message[i];
        } else {
          messageChar += baseKey[this.decryptKey.indexOf(message.charAt(i))];
        }
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

.app__messages {
  margin-top: 20px;
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

.app__input {
  max-width: 400px;
  padding: 2%;
  margin-right: 20px;
}

.fade-enter-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


<style scoped>
/* app 690px */

@media only screen and (max-width: 690px) {
  .app__reply {
    margin-top: 0;
  }

  .app__user-reply {
    padding: 3.2%;
    font-size: 1.4rem;
    border-radius: 18px;
  }

  .app__btn {
    padding: 0.7rem;
  }
}

.app__message-content {
  margin-bottom: 50px;
}

.app__messages {
  margin-top: 20px;
}

.app__user-reply {
  margin-bottom: 50px;
}

.app__submit {
  align-items: baseline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
