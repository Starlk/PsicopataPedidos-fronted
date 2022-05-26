<template>
<article class="card shadow">
  <img class="card-img-top w-100" :src="Img" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{Title}}</h5>
    <p class="card-text">{{Desc}}</p>
      <button  class="btn btn-primary m-4" @click="this.$emit('handleClick')">{{btnTitle}}</button>
      <button v-if="isAuthorized" class="btn btn-primary">{{btnSecond}}</button>
        <slot></slot>
  </div>
</article>
</template>


<script>
import { useTokeStore } from '../stores/tokeStore'
import Button from './ButtonCrud.vue'
export default{
    setup(){
        const token = useTokeStore()
        return {
            token
        }
    },
    props:{
        Img:String,
        Desc:String,
        Title:String,
        btnTitle:String,
        btnSecond:String,
    },
    computed:{
        isAuthorized(){
            return this.token.getAuthorizated
        }
    },
    components:{Button}
}

</script>

<style>

</style>