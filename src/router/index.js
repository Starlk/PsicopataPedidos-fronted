import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import RegisteView from "../views/RegisterView";
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
      component: UsersView,
    },
    {
      path: "/Register",
      name: "Registrar usuarios",
      component: RegisteView,
    },
    {
      path: "/Categories",
      name: "Categorys",
      component: RegisteView,
    },
    {
      path: "/Products",
      name: "Products add",
      component: RegisteView,
    },
  ],
});

export default router;
