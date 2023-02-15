// import { createRouter, createWebHistory } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/404View.vue';

//modo html5 (createWebHistory) trabaja desde el backend y hash trabaja desde el frontend no beneficia el SEO
//Navigation Guards procesos de autenticacion y autorizacion mediante informacion del backend

const stae = import.meta.env.VITE_STAGE

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // { path: '/home', redirect: {name: 'home'} }, redirecciion
    // {path: '/', name: 'home', component: () => HomeView},
    { path: '/404', component: () => NotFound },
    { path: '/:catchAll(.*)', redirect: '/404' },
    {
      path: '/',
      name: 'home',
      component: () => HomeView,
      alias: ['/home'],
      meta: {
        requiresAuth: false
      }
    },//alias
    {
      path: '/session', 
      name: 'session', 
      component: () => import('../views/SessionView.vue'),
      children: [
        {
          path: '',
          components: {
            default: () => import('../views/LoginView.vue'),
            register: () => import('../views/RegisterView.vue'),
          }
        },
      ]
    },
    {path: '/about', name: 'about', component: () => import('../views/AboutView.vue')},
    {
      path: '/chats', 
      component: () => import('../views/ChatsView.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ':chatId(\\d+)', 
          component: () => import('../views/ChatView.vue'),
          // props: true,
          props: (route) => {
            return {
              chatId: route.params.chatId
            }
          }
          // props: {
          //   chatId: '3'
          // }
        
        },
      ]
    },

  ]
})

if (stage === 'test') {
  router.addRoute({
    path: '/profile',
    component: () => import('../views/ProfileView.vue')
  })
}
router.beforeEach((to, from) => {
  console.log(to, from)
  // if(to.meta?.requiresAuth)&& to.meta.roles.includes('admin')
  //  {
  //   console.log(to.path, 'requiresAuth')
  //   return '/session'
  // }

  // if(to.path === '/') return {name: 'about'};
  return true 
})

export default router