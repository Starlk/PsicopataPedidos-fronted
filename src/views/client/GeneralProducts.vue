<template>
  <div class="container">
    <div class="row mb-3">
      <Loading :loading="Loading" />
      <div
        class="col col-12 col-sm-4 col-lg-4 mb-2"
        v-for="product in products"
      >
        <CardComponet
          :Img="product.image"
          :Desc="product.description"
          :Title="product.name"
          btnTitle="Add car"
          btnSecond="Update product"
          @handleClick="() => AddShoppingList(product.id)"
        />
      </div>
      <div v-if="erro">
        <h1 class="text-danger text-center">{{ errorMensaje }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { GetRequest, SendRequest } from "../../helper/HttpHelper";
import { shoppingPath } from "../../constant/PathAPI";
import { useTokeStore } from "../../stores/tokeStore";
import { productPath } from "../../constant/PathAPI";
import CardComponet from "../../components/CardComponet.vue";
import Loading from "../../components/Loading.vue";
import getCurrentTime from "../../helper/Date";

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
      Loading: false,
      erro: false,
      errorMensaje: "",
    };
  },
  methods: {
    async getProducts() {
      this.Loading = true;
      try {
        this.products = await GetRequest(productPath, this.toke.getToke);
      } catch (err) {
        this.errorMensaje = err;
        this.erro = true;
      } finally {
        this.Loading = false;
      }
      this.cleanView();
    },

    async AddShoppingList(product) {
      const { getUser, getToke } = this.toke;
      try {
        SendRequest(
          shoppingPath,
          {
            userId: getUser,
            productId: product,
            count: 1,
            date: getCurrentTime(),
          },
          "POST",
          getToke
        );
      } catch (err) {
        console.log(err);
        return;
      }
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "product add to your car",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    cleanView() {
      this.errorMensaje = "";
      this.erro = false;
    },
  },
  mounted() {
    this.getProducts();
  },
  components: { CardComponet, Loading },
};
</script>
