<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item nav-link" v-for="({name,path}, index) in links">
          <RouterLink :to="path" class="nav-link">{{ name }}</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      links: [
        { name: "users", path: "/dashboard/" },
        { name: "Products", path: "/dashboard/Products" },
        { name: "Categories", path: "/dashboard/Categories" },
      ],
    };
  },
};
</script>
