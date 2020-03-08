// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'

const firebase = require('./firebase/firebaseConfig')

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

let app
firebase.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
      render: h => h(App)
    })
  }
})
