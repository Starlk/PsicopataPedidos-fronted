import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import RegisterUser from "../views/RegisterUser.vue";
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
      component: RegisterUser,
    },
    {
      path: "/Update:form",
      name: "Update User",
      component: RegisterUser,
    },
  ],
});

export default router;
