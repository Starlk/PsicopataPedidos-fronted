import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/global/LoginView.vue";
import UsersView from "../views/admin/UsersView.vue";
import RegisterView from "../views/global/RegisterView.vue";
import ProductView from "../views/admin/ProductView.vue";
import CategoryView from "../views/admin/CategoryView.vue";
import PanelAdminView from "../views/admin/PanelAdmin.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/Register",
      name: "Registrar usuarios",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      component: PanelAdminView,
      children: [
        {
          path: "",
          name: "Users",
          component: UsersView,
        },
        {
          path: "Categories",
          name: "Categorys",
          component: CategoryView,
        },
        {
          path: "Products",
          name: "Products add",
          component: ProductView,
        },
      ],
    },
  ],
});

export default router;
