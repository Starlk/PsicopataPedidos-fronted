<template>
  <div class="input-group mb-3">
    <label for={{GroupLabel}} class="input-group-text">{{ GroupLabel }}</label>
    <input
      id={{GroupId}}
      @input="(event) => HooksInputEvent(event.target.value)"
      :type="InputType ? InputType : 'text'"
      class="form-control"
      :value="input"
    />
  </div>
</template>
 
<script>
import { computed } from "@vue/reactivity";
import { stringifyQuery } from "vue-router";
export default {
  data(){
    return{
      data:""
    }
  },
  props: {
    GroupLabel: String,
    GroupId: String,
    InputType:String,
    input:String
  },

  methods: {
    HooksInputEvent(value) {
      this.$emit("handleChange", this.GroupId, value);
    },
    
  },

  computed:{
    Value(){
      return this.InputValue
    }
    
  }
};
</script>
