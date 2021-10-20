import * as VueRouter from "vue-router";

import User from "./views/user";
import BugList from "./views/bug-list";
import Login from "./views/login";
import Register from "./views/register";

const routes = [
  { path: "/", component: BugList, name: "BugList" },
  { path: "/users", component: User, name: "Users" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Register, name: "Register" },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
