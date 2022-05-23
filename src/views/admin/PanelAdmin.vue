<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li
          class="nav-item nav-link"
          v-for="({ name, path }, index) in LinksVisible"
        >
          <RouterLink :to="path" class="nav-link" >{{
            name
          }}</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
import Roles from "../../constant/Roles";
import { useTokeStore } from "../../stores/tokeStore";
export default {
  setup() {
    const token = useTokeStore();
    return {
      token,
    };
  },
  data() {
    return {
      links: [
        { name: "List Products", path: "/dashboard/", role: Roles.client },
        { name: "users", path: "/dashboard/Users", role: Roles.admin },
        { name: "Products", path: "/dashboard/Products", role: Roles.admin },
        {
          name: "Categories",
          path: "/dashboard/Categories",
          role: Roles.admin,
        },
      ],
    };
  },
  computed: {
    LinksVisible() {
      return this.token.getAuthorizated
        ? this.links
        : this.links.filter((link) => link.role !== Roles.admin);
    },
  },
};
</script>
