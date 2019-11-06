<template>
  <section class="profile">
    <div class="profile__wrapper">
      <div class="profile__profile">
        <div class="profile__box r">
          <div class="profile__bg">
            <img class="profile__img" :src="modifyImg()" alt="icon of user" />
          </div>
        </div>
        <p class="profile__name text-cente">{{this.user.displayName}}</p>
        <p class="profile__des">{{this.description[this.num]}}</p>
        <div class="profile__info flex text-center">
          <i class="profile__icon fas fa-key">
            <span class="ml-2">秘密鍵:</span>
          </i>
          <p class="profile__key">{{this.keyInfo.code}}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import Footer from "../components/Footer.vue";
export default {
  computed: mapState(["user", "keyInfo"]),

  created() {
    this.num = this.getRandomDescription();
  },

  components: {
    Footer
  },
  data: function() {
    return {
      num: 0,
      description: [
        "無類のお肉好きであり週末には必ずと言って良いほど焼肉屋に通っている。付き合わされる友の胃の気持ちになってほしいものである。",
        "空を眺めているのが大好きで日中は地元の川の河川敷で見つかることが多い。雲を巨大な綿菓子と勘違いしてる節がある。",
        "人間に見えるかもしれないがこう見えてれっきとしたフンボルトペンギンである。この秘密を知るものは君と魚屋さんのみである。"
      ]
    };
  },

  methods: {
    getRandomDescription() {
      let randomNum = Math.random() * 3;
      return Math.floor(randomNum);
    },
    modifyImg() {
      if (this.user.photoURL != undefined) {
        return this.user.photoURL.replace("normal", "bigger");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>