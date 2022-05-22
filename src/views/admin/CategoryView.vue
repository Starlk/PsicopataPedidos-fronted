<template>
  <Pages @openModal="openModal">
    <Table :titlesProp="['Name ']">
      <tr v-for="(category, index) in response" :key="category.id">
        <td>{{ category.name }}</td>

        <td>
          <ButtonCrud @Click="() => openModalUpdate(category)">Update</ButtonCrud>
          <ButtonCrud @Click="() => handleDelete(category.id)">Delete</ButtonCrud>
        </td>
      </tr>
    </Table>
  </Pages>
  <Modal
    :title="isUpdate ? 'Update user' : 'Create user'"
    v-if="isModalOpen"
    @closeModel="closeModal"
  >
    <Form
      :fields="arrayForm"
      :InitialForm="form"
      btnName="Save"
      @handleSubmit="
        (form) => (isUpdate ? handleUpdate(form) : handleSubmit(form))
      "
    />
  </Modal>
</template>
<script>
import {
  GetRequest,
  SendRequest,
  DeleteRequest,
} from "../../helper/HttpHelper";
import { categoryPath } from "../../constant/PathAPI";
import ValidateForm from "../../helper/ValidateFormHelper";
import Modal from "../../components/Modal.vue";
import Form from "../../components/Form.vue";
import category from "../../json/category.json";
import initialCategory from "../../modals/InitialFormCategory";
import Table from "../../components/Table.vue";
import Pages from "../../components/PagesControl.vue";
import ButtonCrud from "../../components/ButtonCrud.vue";
import HandleChange from "../../helper/HandleChangeHelper";
import CreateOptions from "../../helper/CreateOption";
import { useTokeStore } from "../../stores/tokeStore";
export default {
  setup(){
    const token = useTokeStore();
    return{
      token
    }
  },
  data() {
    
    return {
      response: [],
      form: initialCategory,
      isModalOpen: false,
      arrayForm: category,
      isUpdate: false,
    };
  },
  methods: {
    async GetAllCategory() {
      try {
        this.response = [...(await GetRequest(categoryPath,this.token.getToke))];
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(id) {
      try {
        await DeleteRequest(`${categoryPath}/${id}`,this.token.getToke);
      } catch (err) {
        console.log(err);
      }
      this.GetAllCategory();
    },
    async handleSubmit(form) {
      if (!ValidateForm(form)) {
        this.ErrorForm = true;
        return;
      }
      this.ErrorForm = false;
      try {
        await SendRequest(categoryPath, {
          ...form,
        },"POST",this.token.getToke);
      } catch (err) {
        console.error(err);
      }
      this.GetAllCategory();
    },
    async handleUpdate(form) {
      try {
        await SendRequest(`${categoryPath}/${this.form.id}`, form, "PUT",this.token.getToke);
      } catch (err) {
        console.log(err);
      }
      this.GetAllCategory();
    },
    openModalUpdate(users) { 
      this.form = { ...users };
      this.isUpdate = true;
      this.openModal();
    },
    handleChange(name, value) {
      this.form = HandleChange(this.form, name, value);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.isUpdate = false;
      this.form = initialCategory
    },
  },
  mounted() {
    this.GetAllCategory();
  },
  components: { Modal, Form, Table, Pages, ButtonCrud },
};
</script>
