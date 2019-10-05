<template>
  <section class="app">
    <div class="app__wrapper">
      <h2 class="app__title">暗号研究所</h2>
      <div class="app__messages">
        <div class="app__message flex item-center justify-between mt-20">
          <div class="app__guide">
            <img src="../assets/img/app__icon.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt">暗号研究所へようこそ！ここではメッセージの暗号化を行っているぞ！</p>
          </div>
        </div>

        <div class="app__reply flex item-center justify-between mt-10">
          <input v-model="message" placeholder="ここにメッセージを入力" class="app__user-reply" />

          <div class="app__user">
            <img src="../assets/img/about__icon1.svg" alt class="app__icon rounded-full" />
            <p class="app__user-name mt2">あなた</p>
          </div>
        </div>
        <!-- End -->
        <div class="app__message flex item-center justify-between mt-10">
          <div class="app__guide">
            <img src="../assets/img/app__icon.svg" class="app__icon rounded-full" />
            <p class="app__guide-name mt-2">賢いペンギン</p>
          </div>

          <div class="app__message-content">
            <p class="app__message-txt" v-if="message">{{this.reverse(this.message)}}</p>
            <p class="app__message-txt" v-else>暗号化は僕に任せて！</p>
          </div>
        </div>

        <!-- end -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      message: "",
      empty: false
    };
  },

  methods: {
    reverse(tex) {
      let reversed = "";
      for (let i = 0; i <= tex.length; i++) {
        reversed += tex.charAt(tex.length - i);
      }
      return reversed;
    }
  },

  filters: {
    test: function(test) {
      return reverse(test);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>