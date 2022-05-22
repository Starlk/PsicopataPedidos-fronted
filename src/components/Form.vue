<template>
  <form v-for="field in FieldsInput" class="form">
    <GroupInput
      Group-label="...."
      :Group-Id="field.name"
      @handleChange="handleChange"
      :Group-Title="field.placeholder"
      :type="field.type"
      :input="Form[field.name]"
    />
  </form>
  <button class="btn btn-outline-success w-100 mb-2" @click="handleSubmit">Save</button>
</template>

<script>
import GroupForm from "./GroupForm.vue";
import GroupInput from "./GroupInput.vue";
export default {
  props: {
    fields: Array,
    InitialForm: Object,
  },
  data() {
    return {
      Form: this.InitialForm,
      FieldsInput: this.fields,
    };
  },
  methods: {
    handleChange(name, value) {
      this.Form = { ...this.Form, [name]: value };
    },
    handleSubmit(){
      this.$emit("handleSubmit",this.Form)
    }
  },
  components: { GroupInput },
};
</script>
