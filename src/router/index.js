import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const ShopCart = () => import('../views/cart/ShopCart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import ('../views/detail/Detail.vue')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'detail',
    path: '/detail/:iid',
    component: Detail,
    meta: {
      keepAlive: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

