<template>
  <section class="cta" id="cta">
    <div class="cta__wrapper">
      <h2 class="cta__title mt-10">使い方はあなた次第</h2>
      <div class="cta__box p-10 mt-10">
        <div class="cta__item flex items-center">
          <img src="../assets/img/cta__icon1.png" class="cta__icon" alt />
          <div class="cta__text-box">
            <p class="cta__text text-left">友達と暗号会話を楽しむ</p>
            <p class="cta__subtext text-left">
              子供の頃に友達と暗号で会話してみたいと思ったことはありませんか？
              アンゴウメッセはそんな貴方の幼き頃の夢を叶えます。
            </p>
          </div>
        </div>
        <div class="cta__item flex items-center">
          <img src="../assets/img/cta__icon2.png" class="cta__icon" alt />
          <div class="cta__text-box">
            <p class="cta__text text-left">誰にも知られたくない事をつぶやく</p>
            <p class="cta__subtext text-left">誰にも知られたくないけど呟きたい！！そう思ったことはないですか？ツイートを暗号化して思いっきり呟こう！！</p>
          </div>
        </div>
        <div class="cta__item flex items-center">
          <img src="../assets/img/cta__icon3.png" class="cta__icon" alt />
          <div class="cta__text-box">
            <p class="text-left cta__text">恥ずかしい日記を暗号化する</p>
            <p class="cta__subtext text-left">
              絶賛中二病の諸君！悪いことは言わないから、今のうちに日記を暗号化しておくんだ！
              数年後に感謝することになるから...
            </p>
          </div>
        </div>
      </div>
      <!-- End of box -->
    </div>
    <div class="cta__cta">
      <p class="cta__call mt-20">ね？ 楽しそうでしょう？</p>
      <a @click.prevent="jumpApp()" class="cta__btn mt-10">さっそく使ってみる</a>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState(["user"]),
  methods: {
    doLogIn() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    jumpApp() {
      if (this.user) {
        this.$router.push({ path: "app" });
      } else {
        this.doLogIn();
      }
    }
  }
};
</script>

