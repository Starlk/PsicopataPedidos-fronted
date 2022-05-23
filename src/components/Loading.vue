<template>
  <section class="spinner">
    <div class="spinner-border loading--absolute" role="status" v-if="loading">
      <span class="sr-only"></span>
    </div>
  </section>
</template>

<script>
    export default{
        props:{
            loading:Boolean
        }
    }
</script>
<style>
.loading--absolute {
  position: absolute;
  margin-top: 50px;
}
</style>
