<template>
  <header class="header p-3 shadow z-50 fixed">
    <div class="header__wrapper flex items-center justify-between">
      <h1 class="header__logo flex items-center">
        <img src="../assets/img/header__logo1.png" class="h-16 mr-2" alt />
        <router-link to="/" class="header__link">
          <img src="../assets/img/logo.png" class="header__logo-img" alt />
        </router-link>
      </h1>

      <div v-if="user" class="header__icon relative">
        <a class="header__profile" @click.prevent="clickProfile">
          <img class="header__profile rounded-full shadow-lg" :src="user.photoURL" alt />
        </a>

        <transition name="fade">
          <div
            class="header__card shadow-outline absolute p-5"
            v-click-outside="close"
            v-if="clicked"
          >
            <p class="header__user-name block">{{user.displayName}}</p>
            <ul class="center p-10">
              <li class="header__list">
                <router-link to="profile" class="header__link">
                  <i class="far fa-address-card header__card-icon mr-3"></i>マイページ
                </router-link>
              </li>
              <li class="mt-5 header__list">
                <router-link to="app" class="header__link">
                  <i class="fas fa-lock mr-3 header__card-icon"></i>暗号研究所へ
                </router-link>
              </li>
              <li class="mt-5 header__list">
                <router-link to="app2" class="header__link">
                  <i class="fas fa-key mr-3 header__card-icon"></i>解読研究所へ
                </router-link>
              </li>
            </ul>

            <a @click.prevent="logOut" class="header__logout block">
              <i class="fas mr-3 fa-sign-out-alt"></i>ログアウト
            </a>
          </div>
        </transition>
      </div>
      <a @click.prevent="logIn" class="header__btn" v-else>ログイン</a>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ClickOutside from "vue-click-outside";

export default {
  computed: mapState(["user", "keyInfo"]),
  data: function() {
    return {
      clicked: false,
      opened: false
    };
  },

  mounted() {
    this.popupItem = this.$el;
  },

  directives: {
    ClickOutside
  },

  methods: {
    clickProfile() {
      this.clicked = !this.clicked;
    },
    logOut() {
      this.$store.commit("logOut");
      this.$store.commit("setKeyInfo", {});
      /* 
      this.$store.commit("setKeyInfo", {});
      */
    },
    logIn() {
      this.$store.commit("logIn");
    },
    close() {
      this.clicked = false;
    },

    toggle() {
      this.opened = true;
    },

    hide() {
      this.opened = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>