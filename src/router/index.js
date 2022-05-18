import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import CreateUser from "../views/CreateUser.vue";
import UpdateUser from "../views/UpdateUser.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/Users",
      name: "Users",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UsersView,
    },
    {
      path: "/CreateUser",
      name: "Crear usuarios",
      component: CreateUser,
    },
    {
      path: "/Update:form",
      name: "Update User",
      component: UpdateUser,
    },
  ],
});

export default router;
