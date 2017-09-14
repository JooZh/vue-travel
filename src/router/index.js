import Vue from 'vue'
import Router from 'vue-router'
import Travel from 'components/travel/Travel'
import Approval from 'components/approval/Approval'
import Launch from 'components/launch/Launch'
import Wait from 'components/wait/Wait'
import CCtome from 'components/cctome/CCtome'
import My from 'components/my/My'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'first-active',
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/travel'
  }, {
    path: '/travel',
    component: Travel
  }, {
    path: '/approval',
    component: Approval,
    children: [{
      path: '/approval',
      redirect: '/approval/launch'
    }, {
      path: '/approval/launch',
      component: Launch
    }, {
      path: '/approval/wait',
      component: Wait
    }, {
      path: '/approval/cctome',
      component: CCtome
    }]
  }, {
    path: '/my',
    component: My
  }]
})
