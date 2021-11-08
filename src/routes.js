import * as VueRouter from "vue-router";
import get from 'lodash.get';

import User from "./views/user";
import BugList from "./views/bug-list";
import Login from "./views/login";
import Register from "./views/register";
import NotFound from "./views/not-found";
import Project from "./views/project";

const routes = [
  { path: "/", component: Login, name: "Login" },
  {
    path: "/bugs", component: BugList, name: "BugList", meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/users", component: User, name: "Users", meta: {
      requiresAuth: true,
    }
  },
  { path: "/register", component: Register, name: "Register" },
  { path: "/projects", component: Project, name: "ProjectList" },
  { path: "/:pathMatch(.*)", component: NotFound, name: 'NotFound' },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = JSON.parse(localStorage.getItem('vuex'));
  const logged = get(loggedIn, 'user.token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!logged) {
      next('/');
    } else {
      if (['Register', 'Login'].indexOf(to.name) !== -1) {
        return next('/bugs')
      }
      next();
    }
  } else {
    next();
  }
});

export default router;
