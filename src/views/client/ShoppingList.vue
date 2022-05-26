<template>
  <div class="container">
    <div class="row">
      <div
        class="col col-12 col-sm-4 col-lg-4 mb-2"
        v-for="product in shoppingResponse"
      >
        <CardComponet
          :Img="product.image"
          :Desc="product.description"
          :Title="product.name"
          btnTitle="Add car"
          btnSecond="Update product"
          @handleClick="() => AddShoppingList(product.id)"
        >
            <button class="btn btn-danger" @click="()=>handleClick(product)">Delete</button>
        </CardComponet>
      </div>
    </div>
  </div>
</template>

<script>
import { shoppingPath } from "../../constant/PathAPI";
import { SendRequest, GetRequest, DeleteRequest } from "../../helper/HttpHelper";
import { useTokeStore } from "../../stores/tokeStore";
import CardComponet from "../../components/CardComponet.vue";
export default {
    setup() {
        const token = useTokeStore();
        return { token };
    },
    data() {
        return {
            shoppingResponse: [],
            response: []
        };
    },
    methods: {
        async getUserShoppingList() {
            try {
                this.response = await GetRequest(`${shoppingPath}/${this.token.getUser}`, this.token.getToke);
            }
            catch (err) {
                console.log(err);
            }
            this.shoppingResponse = this.response.map(el => el.product);
        },
        handleClick(product){
          let shoppingItem = this.response.find(res =>res.product === product).id
          try{
              DeleteRequest(`${shoppingPath}/${shoppingItem}`,this.token.getToke)
          }catch(err){
              console.log(err)
          }
          this.getUserShoppingList();
        }
    },
    mounted() {
        this.getUserShoppingList();
    },
    components: { CardComponet }
};
</script>
