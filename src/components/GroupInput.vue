<template>
     <div class="input__group">
        <label for={{GroupLabel}}>{{GroupLabel}}</label>
        <input id={{GroupId}} @input="event=>HooksInputEvent(event.target.value)"   />
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
export default{
    props:{
        GroupLabel:String,
        GroupId:String,
        ClassName:String
    },

    methods:{
        HooksInputEvent(value){
            this.$emit("handleChange",this.GroupId,value)
        }
    }
}
</script>


<style>
    .input__group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.input__group > label {
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 10px;
}
.input__group > input {
  border-style: none;
  border-bottom-style: solid;
  border-width: 2;
  padding-left: 2em;
  padding-right: 2em;
}
.input__group > input:focus {
  outline: none;
}
</style>