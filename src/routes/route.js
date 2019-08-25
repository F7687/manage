import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login.vue'
import index from '@/components/index.vue'
import welcome from '@/components/welcome.vue'
import user from '@/components/user.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'user',
          path: 'user',
          component: user
        }
      ]
    }
  ]
})
