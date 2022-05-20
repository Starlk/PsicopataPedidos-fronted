<template>
  <table class="_table">
    <thead>
      <tr>
        <th scope="col" class="p-2 text-center border" v-for="Title in Titles">{{ Title }}</th>
        <th scope="col "></th>
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


<style>
._table{
    width: 90%;
    border: 1px solid rgb(63, 63, 63);
    border-radius: 5px;
    margin: 0 auto;
    
}
._table thead{
    background-color: rgb(229, 229, 229);
    padding: 1em;
}
._table__center{
    text-align: center;
    background-color: red;
}
</style>