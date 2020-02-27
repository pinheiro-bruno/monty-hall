import Vue from 'vue'
import Router from 'vue-router'
import MontyHall from '@/components/MontyHall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MontyHall',
      component: MontyHall
    }
  ]
})
