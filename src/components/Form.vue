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
      console.log(this.Form);
      this.Form = { ...this.Form, [name]: value };
    },
  },
  components: { GroupInput },
};
</script>
