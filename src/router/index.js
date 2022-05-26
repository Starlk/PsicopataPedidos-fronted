import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/global/LoginView.vue";
import UsersView from "../views/admin/UsersView.vue";
import RegisterView from "../views/global/RegisterView.vue";
import ProductView from "../views/admin/ProductView.vue";
import CategoryView from "../views/admin/CategoryView.vue";
import PanelAdminView from "../views/admin/PanelAdmin.vue";
import ShoppingList from "../views/client/ShoppingList.vue";
import { useTokeStore } from "../stores/tokeStore";
import GeneralProducts from "../views/client/GeneralProducts.vue";
const isAuthorized = () => {
  const token = useTokeStore();
  if (!token.getAuthorizated) return { name: "defaultView" };
};
const isAuth = () => {
  const token = useTokeStore();
  if (!token.getAuth) return { name: "Login" };
};

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
          name: "defaultView",
          component: GeneralProducts,
          beforeEnter() {
            return isAuth();
          },
        },
        {
          path: "ShoppingList",
          name: "ShoppingList",
          component: ShoppingList,
          beforeEnter() {
            return isAuth();
          },
        },
        {
          path: "Users",
          name: "Users",
          component: UsersView,
          beforeEnter() {
            return isAuthorized();
          },
        },
        {
          path: "Categories",
          name: "Categorys",
          component: CategoryView,
          beforeEnter() {
            return isAuthorized();
          },
        },
        {
          path: "Products",
          name: "Products add",
          component: ProductView,
          beforeEnter() {
            return isAuthorized();
          },
        },
      ],
    },
  ],
});

export default router;
