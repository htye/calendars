import Vue from 'vue'
import Router from 'vue-router'
const Month = () => import(/* webpackChunkName: "NewIndex" */  '@/pages/others/month.vue');
const Week = () => import(/* webpackChunkName: "NewIndex" */  '@/pages/others/week.vue');
const Warn = () => import(/* webpackChunkName: "NewIndex" */  '@/pages/others/warn.vue');
const Set = () => import(/* webpackChunkName: "NewIndex" */  '@/pages/others/set.vue');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Month',
      component: Month,
      meta: {
        keepAlive: true,
        isFoot: true
      }
    },
    {
      path: '/month',
      name: 'Month',
      component: Month,
      meta: {
        keepAlive: true,
        isFoot: true
      }
    },
    {
      path: '/week',
      name: 'Week',
      component: Week,
      meta: {
        keepAlive: true,
        isFoot: true
      }
    },
    {
      path: '/warn',
      name: 'Warn',
      component: Warn,
      meta: {
        keepAlive: true,
        isFoot: true
      }
    },
    {
      path: '/set',
      name: 'Set',
      component: Set,
      meta: {
        keepAlive: true,
        isFoot: true
      }
    },
  ]
})
