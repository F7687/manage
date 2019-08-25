import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/routes/route.js'

Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  // console.log('haha')
  // console.log(to)
  let token = localStorage.getItem('itcast')
  // console.log(token)
  if (token || to.path === '/login') {
    next()
  } else {
    // 重定向
    next({ path: '/login' })
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
