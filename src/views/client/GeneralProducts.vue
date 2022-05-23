<template>
  <div class="container">
    <div class="row mb-3">
        <Loading :loading="Loading"/>
      <div class="col col-12 col-sm-4 col-lg-4 mb-2" v-for="product in products">
        <CardComponet
          :Img="product.image"
          :Desc="product.description"
          :Title="product.name"
          btnTitle="Add car"
          btnSecond="Update product"
        />
      </div>
      <div v-if="erro">
        <h1 class="text-danger text-center">{{errorMensaje}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { GetRequest } from "../../helper/HttpHelper";
import { useTokeStore } from "../../stores/tokeStore";
import { productPath } from "../../constant/PathAPI";
import CardComponet from "../../components/CardComponet.vue";
import Loading from "../../components/Loading.vue";

export default {
  setup() {
    const toke = useTokeStore();
    return {
      toke,
    };
  },
  data() {
    return {
      products: [],
      Loading:false,
      erro:false,
      errorMensaje:""
    };
  },
  methods: {
    async getProducts() {
        this.Loading = true;
      try {
        this.products = await GetRequest(productPath, this.toke.getToke);
      } catch (err) {
        this.errorMensaje = err;
        this.erro = true
      }
      finally{
          this.Loading = false
      }
        this.cleanView();
    },
    cleanView(){
        this.errorMensaje =""
        this.erro = false;
    }
  },
  mounted() {
    this.getProducts();
  },
  components: { CardComponet, Loading },
};
</script>
