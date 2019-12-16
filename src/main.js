import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: "UA-16618146-4" }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
