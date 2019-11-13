<template>
  <section class="app">
    <div class="app__wrapper">
      <h2 class="app__title">暗号研究所 - 暗号化部門</h2>
      <div class="app__messages">
        <div class="app__message flex item-center justify-between mt-20">
          <div class="app__guide">
            <img src="../assets/img/app__icon.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt">
              暗号研究所へようこそ！ここではメッセージの暗号化を行っているぞ！
              <br />君の解読キーは
              <span style="color:red">{{keyInfo.code}}</span>だよ～ メッセージを呼んでほしい相手に教えてね
              暗号化されたメッセージはタップ,クリックでコピーできるよ！
            </p>
          </div>
        </div>

        <div class="app__reply flex item-center justify-between mt-10">
          <input
            v-model="message"
            placeholder="暗号化したいメッセージを入力"
            @focus="message=''"
            class="app__user-reply"
          />

          <div class="app__user">
            <img :src="modifyImg()" alt class="app__icon rounded-full" />
            <p class="app__user-name mt2">{{user.displayName}}</p>
          </div>
        </div>

        <!-- End -->
        <div class="app__message flex item-center justify-between mt-10">
          <div class="app__guide">
            <img src="../assets/img/app__icon.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン</p>
          </div>

          <div class="app__message-content">
            <a @click.prevent="copyMessage()">
              <a href @click.prevent="copyMessage()" v-if="message">
                <p class="app__message-txt" id="encryptedMessage">{{this.encrypt(this.message)}}</p>
              </a>
              <p class="app__message-txt" v-else>暗号化は僕に任せて！</p>
           </a>
          </div>
        </div>

        <!-- end -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState(["user", "messages", "keyInfo"]),

  data: function() {
    return {
      message: "",
      empty: false,
      validKey: false,
      baseKey:
        "いz7んhつうvびwろおめごgぱcぉ6ひあじわぞeぐfらnxざaやもmとちょrどだま8oよたぃねぇずlゅぺけでふほぶはぼぴぽすさぎづき2ぅへむそっぷ14のjゆりてげdsがゃにぬくpぢえtべ5なれかyしbiをぜぁこみせばるk3uq9"
    };
  },

  methods: {
    checkLoginInfo() {
      if (this.user == null) {
        this.$router.push({ name: "home" });
      }
    },
    modifyImg() {
      if (this.user.photoURL != undefined) {
        return this.user.photoURL.replace("normal", "bigger");
      }
    },

    //encrypt message based on key info.
    encrypt(message) {
      let encryptedMessage = "";
      let messageChar = "";
      let baseKey = Array.from(this.baseKey);

      for (let i = 0; i <= message.length - 1; i++) {
        messageChar = this.keyInfo.key[baseKey.indexOf(message.charAt(i))];

        if (messageChar == undefined) {
          messageChar = message.charAt(i);
        }
        encryptedMessage += messageChar;
      }

      for (let j = 0; j <= message.length - 1; j++) {
        messageChar += baseKey[this.keyInfo.key.indexOf(message.charAt(j))];
      }
      return encryptedMessage;
    },

    copyMessage() {
      let messageToCopy = document.getElementById("encryptedMessage").innerHTML;

      // 求）TextNodeのスマートな取得方法
      let textarea = document.createElement("textarea");
      textarea.value = messageToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  },
  //check user info when created.
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