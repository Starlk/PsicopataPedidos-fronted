<template>
  <table class="table table-primary">
    <thead>
      <tr>
        <th scope="col text-center" v-for="Title in Titles">{{ Title }}</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    titlesProp: Array,
  },
  data() {
    return {
      Titles: this.titlesProp,
    };
  },
};
</script>
