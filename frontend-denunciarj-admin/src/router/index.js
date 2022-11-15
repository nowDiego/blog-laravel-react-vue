import { createRouter, createWebHistory } from 'vue-router'
import Middlewares  from '../middlewares/index'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta:{
      middleware: [Middlewares.auth]
      }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




function nextCheck(context,middleware,index){
  const nextMiddleware = middleware[index];
 
  if(!nextMiddleware)return context.next;

  return (...parameters)=>{
    context.next(...parameters);
   
    const nextMidd = nextCheck(context,middleware,index+1)
 nextMiddleware({...context,nextMidd});
  }
}

router.beforeEach((to,from,next)=>{
  if(to.meta.middleware){
     const middleware = Array.isArray(to.meta.middleware)? to.meta.middleware:[to.meta.middleware];
     
     const ctx = {
       from,
       next,
       router,
       to
     }

     const nextMiddleware = nextCheck(ctx,middleware,1);
     return middleware[0]({
       ...ctx,
       next: nextMiddleware});

  }
  return next();
});


export default router
