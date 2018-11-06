import Vue from 'vue';
import App from './App';
import router from 'routes/index';
import store from 'stores/index';

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

