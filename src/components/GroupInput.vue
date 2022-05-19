<template>    
        <label  class="input_label">{{GroupTitle}}</label>
     <div class="input__group">
        <input id={{GroupId}} @input="event=>HooksInputEvent(event.target.value)"  :placeholder="GroupLabel" :type="type" :value="input"  />
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
export default{
    props:{
        GroupLabel:String,
        GroupId:String,
        GroupTitle:String,
        type:String,
        input:String
      
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
 display: flex;
 padding: .5em;
 border: solid 1px rgb(141, 140, 140);
 margin-bottom: 1em;
 border-radius: 5px;
}

.input__group > input {
  border: none;
  background-color: transparent;
  width: 100%;
}
.input__group > input:focus {
 outline: none;
}
.input_label{
  margin-bottom: 7px;
   
}

</style>