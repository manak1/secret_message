<template>
  <div>
    <header class="header p-3 shadow z-50">
      <div class="header__wrapper flex items-center justify-between">
        <h1 class="header__logo flex items-center">
          <img src="./assets/img/secret.svg" class="h-16 mr-4" alt />
          CaesarMessage
        </h1>
        <button class="header__btn">はじめる</button>
      </div>
    </header>
    <Hero />
    <About />
  </div>
</template>

<script>
import "./assets/css/tailwind.css";
import "./assets/css/index.css";
import About from "@/components/About.vue";
import Hero from "@/components/Hero.vue";

export default {
  components: { Hero, About }
};
</script>

