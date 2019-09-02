import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import FormGenerator from './views/FormGenerator.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      props: true
    },
    {
      path: '/formGenerator',
      name: 'formGenerator',
      component: FormGenerator,
      props: {
        json: ''
      }
    }
  ]
})
