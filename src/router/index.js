import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const User = () => import('../views/user/User.vue')
const Goodsdetail = () => import('../views/Goodsdetail/Goodsdetail.vue')

  const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/home',
    name: 'home',
    component:Home,
  },
  {
    path:'/category',
    name:'category',
    component:Category,
  },
  {
    path:'/cart',
    name:'cart',
    component:Cart,
  },
  {
    path:'/user',
    name:'user',
    component:User,
  },
  {
    path:'/Goodsdetail/:id',
    name:'Goodsdetail',
    component:Goodsdetail,
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'hotpink',
})

export default router
