import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AboutPage from "./views/AboutPage.vue";
import AppPage from "./views/AppPage.vue";
import AppPage2 from './views/AppPage2.vue';
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
      props: true
    },
    {
      path: "/app",
      name: "app",
      component: AppPage
    },
    {
      path: '/app2',
      name: 'app2',
      component: AppPage2
    }
  ]
});