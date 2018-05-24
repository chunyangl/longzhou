import Vue from 'vue'
import Router from 'vue-router'
import add from '@/components/add'
import management from "@/components/management";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: management
    },
    {
      path: '/management',
      component: management
    },
    {
      path: '/add',
      component: add
    }
  ]
})
