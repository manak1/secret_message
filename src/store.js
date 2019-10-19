/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        messages: "hello",
        keyInfo: {},
        baseKey: []
    },

    actions: {},

    // eslint-disable-next-line no-dupe-keys
    mutations: {
        updateloginInfo(state, payload) {

            state.user = payload;
        },
        updateEncryptKey(state, payload) {
            state.encryptKey = payload;
        },
        logOut() {
            firebase.auth().signOut();
        },

        logIn() {
            const provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithPopup(provider);
        },

        setKeyInfo(state, payload) {
            state.keyInfo = payload;

        }

        /*     checkUserState() {
            firebase.auth().onAuthStateChanged(user => {
                this.user = user ? user : false;
            });
            console.log(this.user, 'called from store');
        }
 */
    }
});