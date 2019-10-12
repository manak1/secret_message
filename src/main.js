import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import store from "./store";
Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyDAFjagDCBRETCQGBInS5OHELHHY5bgMDs",
  authDomain: "secret-message-c8691.firebaseapp.com",
  databaseURL: "https://secret-message-c8691.firebaseio.com",
  projectId: "secret-message-c8691",
  storageBucket: "secret-message-c8691.appspot.com",
  messagingSenderId: "159762306740",
  appId: "1:159762306740:web:efa0ee10e7362df4ece9e1",
  measurementId: "G-05R1HK1SCG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
