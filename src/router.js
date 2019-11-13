import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AboutPage from "./views/AboutPage.vue";
import AppPage from "./views/AppPage.vue";
import AppPage2 from './views/AppPage2.vue';
import MyPage from './views/MyPage.vue';
import NotFound from './views/NotFound';
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: MyPage
    },
    {
      path: '*',
      component:NotFound
    }
  ]
});