import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Country from './views/Country.vue'

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/country/:alpha3Code',
    name: 'Country',
    component: Country
  }],
  mode: 'history'
})