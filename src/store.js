/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        keyInfo: {},
        baseKey: [],
        testLogin: false
    },

    mutations: {
        //update user state
        updateloginInfo(state, payload) {
            state.user = payload;
        },

        //update user state
        logOut() {
            firebase.auth().signOut();
        },

        //show login screen
        logIn() {
            const provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithPopup(provider);
        },

        //update keyInfo state
        setKeyInfo(state, payload) {
            state.keyInfo = payload;

        },
        updateTestLogin(state, payload) {
            state.testLogin = payload;
        }

    }
});