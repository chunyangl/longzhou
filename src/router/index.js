import Vue from 'vue'
import Router from 'vue-router'
import add from '@/components/add'
import addadmin from '@/components/addadmin'
import management from "@/components/management"
import tagmanage from "@/components/tagManage"
import adminmanagement from "@/components/adminmanagement"

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
    },
    {
      path: '/tagmanage',
      component: tagmanage
    },
    {
      path: '/adminmanagement',
      component: adminmanagement
    },
    {
      path: '/addadmin',
      component: addadmin
    }
  ]
})
