// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  router
} from './router'
import App from './App'
import axios from 'axios'
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(moment)
Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDYIHEWQ30_4w-SdhsxWHyozRoI140yOJU',
    v: '3.27',
    // libraries: 'places', //// If you need to use place input
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

Vue.filter('numberWithCommas', function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
