import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Russian from '../views/Russian.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ru',
    name: 'ru',
    component: Russian
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
