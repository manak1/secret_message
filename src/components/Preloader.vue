<template>
  <transition>
    <div class="preloader" v-if="show">
      <img src="../assets/img/preloader__img0.gif" loop="true" class="preloader__gif" alt />
      <p>LOADING</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
};
  }
};
</script>

<style lang="scss" scoped>
</style>