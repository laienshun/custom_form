import Vue from 'vue'
import config from '@/services/config'
import Router from 'vue-router'

const main = () => import('@/app/main.vue')
const formList = () => import('@/app/formList.vue')
const form = () => import('@/app/form/main.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      meta: {title: config.appName},
      redirect: {name: 'main'},
    }, {
      path: '/',
      name: 'main',
      meta: {title: config.appName + ' | 自定义表单'},
      component: main,
      redirect: {name: 'formList'},
      children: [
        {
          path: 'form-list',
          name: 'formList',
          meta: {title: config.appName + ' | 自定义表单'},
          component: formList,
        }
      ]
    }, {
      path: '/form/add',
      name: 'formAdd',
      meta: {title: config.appName + ' | 自定义表单'},
      component: form
    }, {
      path: '/form/edit/:id',
      name: 'formEdit',
      meta: {title: config.appName + ' | 自定义表单'},
      component: form
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
