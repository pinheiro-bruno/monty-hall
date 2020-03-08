import Vue from 'vue'
import Router from 'vue-router'
import MontyHall from '@/components/MontyHall'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MontyHall',
      component: MontyHall
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
