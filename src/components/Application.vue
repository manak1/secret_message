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
            </p>
          </div>
        </div>

        <div class="app__reply flex item-center justify-between mt-10">
          <input v-model="message" placeholder="ここに暗号化したいメッセージを入力" class="app__user-reply" />

          <div class="app__user">
            <img :src="user.photoURL" alt class="app__icon rounded-full" />
            <p class="app__user-name mt2">{{user.displayName}}</p>
          </div>
        </div>
        <!-- End -->
        <div class="app__message flex item-center justify-between mt-10">
          <div class="app__guide">
            <img src="../assets/img/app__icon.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン{{user.displayName}}</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt" v-if="message">{{this.encrypt(this.message)}}</p>
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
export default {
  computed: mapState(["user", "messages", "keyInfo"]),

  data: function() {
    return {
      message: "",
      empty: false,
      validKey: false
    };
  },

  methods: {
    reverse(tex) {
      let reversed = "";
      for (let i = 0; i <= tex.length; i++) {
        reversed += tex.charAt(tex.length - i);
      }
      return reversed;
    },
    checkLoginInfo() {
      if (this.user == null) {
        this.$router.push({ name: "home" });
      }
    },

    encrypt(message) {
      let encryptedMessage = "";
      let messageChar = "";
      let baseKey = Array.from(
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょabcdefghijklmnopqrstuvwxyz"
      );

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
      console.log("your text is ", messageChar);

      return encryptedMessage;
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

<style lang="scss" scoped>
</style>