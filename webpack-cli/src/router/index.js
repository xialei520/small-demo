import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import gesture from '@/components/gesture'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/gesture',
      name: 'gesture',
      component: gesture
    },
    {
      path: '/gesture',
      name: 'gesture',
      component: gesture
    }
  ]
})
