import Vue from 'vue';

import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';

import messagePlugin from '@/utils/message.plugin';
import Vuelidate from 'vuelidate';
import Loader from '@/components/app/Loader.vue';

import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-database';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: 'AIzaSyCSnaBhQ2c9on1UWCN1FtnLGLLew1x-04c',
  authDomain: 'vue-28305.firebaseapp.com',
  projectId: 'vue-28305',
  storageBucket: 'vue-28305.appspot.com',
  messagingSenderId: '130511762473',
  appId: '1:130511762473:web:e6e0667a8a4b90a20b5838',
  measurementId: 'G-VCM8KKGQJM',
  databaseURL: 'https://vue-28305-default-rtdb.europe-west1.firebasedatabase.app',
};

firebase.initializeApp(firebaseConfig);

let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
