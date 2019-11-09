import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  i18n,
  vuetify,
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount('#app')
