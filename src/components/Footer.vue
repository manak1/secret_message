<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__box flex justfiy-center">
        <div class="footer__item">
          <ul class="footer__lists">
            <li class="footer__lists-item">
              <h3 class="footer__title">Links</h3>
            </li>
            <li class="footer__lists-item">
              <router-link to="/" class="footer__link">ホーム</router-link>
            </li>
            <li class="footer__lists-item">
              <router-link to="profile" class="footer__link">プロフィール</router-link>
            </li>
            <li class="footer__lists-item">
              <router-link to="app" class="footer__link">暗号研究所</router-link>
            </li>

            <li class="footer__lists-item">
              <router-link to="app2" class="footer__link">解読研究所</router-link>
            </li>
            <li class="footer__lists-item">
              <a @click.prevent="logOut()" class="footer__link">ログアウト</a>
            </li>
          </ul>
        </div>

        <div class="footer__item px-20">
          <h3 class="footer__title">開発者</h3>
          <p class="footer__desc">
            このページを訪れて頂きありがとうございます。アンゴウメッセは私が初めて開発したウェブサービスです。
            バグなどが目立つと思いますが、温かい目で見てもらえると嬉しいです！現在私のような初学者が勉強しながら、Webサービス開発に携わる事のできるインターン先を探しています。
            下記SNSでの連絡お待ちしています。
          </p>
          <ul class="mt-5 flex justify-center items-center footer__sns-list">
            <li>
              <a href="
              https://twitter.com/mikeanakida
              ">
                <i class="fab mr-4 fa-twitter footer__sns"></i>
              </a>
            </li>

            <li class>
              <a href="https://github.com/manak1">
                <i class="mr-4 footer__sns fab fa-github"></i>
              </a>
            </li>

            <li class="footer__sns mr-4">
              <a href="https://www.linkedin.com/in/mikeanakida/">
                <i class="fab fa-linkedin footer__sns"></i>
              </a>
            </li>

            <li class="footer__sns">
              <a href="https://www.wantedly.com/users/80804826">
                <i class="fab fa-wikipedia-w footer__sns"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <small class="footer__copyright mt-10 pb-6">copyright © PenguinFactory</small>
    </div>
  </footer>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";
export default {
  comptued: mapState(["user"]),

  methods: {
    logOut() {
      firebase.auth().signOut();
      this.$store.commit("setKeyInfo", " ");
    }
  }
};
</script>
