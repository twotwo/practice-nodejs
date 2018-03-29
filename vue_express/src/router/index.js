import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Console from '@/components/Console'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/Console',
      name: 'Console',
      component: Console
    }
  ]
})
