<template>
  <Pages @openModal="openModal">
    <Table :titlesProp="['Name ', 'Last Name', 'Email', 'Wallet']">
      <tr v-for="(product, index) in response" :key="user.id">
        <td>{{ product.name }}</td>
        <td>{{ product.lastName }}</td>
        <td>{{ product.email }}</td>
        <td>{{ product.wallet }}</td>
        <td>
          <ButtonCrud @Click="() => openModalUpdate(user)">Update</ButtonCrud>
          <ButtonCrud @Click="() => handleDelete(user.id)">Delete</ButtonCrud>
        </td>
      </tr>
    </Table>
  </Pages>
  <Modal
    :title="isUpdate ? 'Update product' : 'Create product'"
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
import { GetRequest, SendRequest, DeleteRequest } from "../helper/HttpHelper";
import { productPath } from "../constant/PathAPI";
import ValidateForm from "../helper/ValidateFormHelper";
import Modal from "../components/Modal.vue";
import Form from "../components/Form.vue";
import users from "../json/users.json";
import initialProduct from "../modals/InitialFormProduct"
import Table from "../components/Table.vue";
import Pages from "../components/PagesControl.vue";
import ButtonCrud from "../components/ButtonCrud.vue";
import HandleChange from "../helper/HandleChangeHelper";
export default {
  data() {
    return {
      response: [],
      form: initialProduct,
      isModalOpen: false,
      arrayForm: users,
      isUpdate: false,
    };
  },
  methods: {
    async GetAllUsers() {
      try {
        this.response = [...(await GetRequest(productPath))];
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(id) {
      try {
        await DeleteRequest(`${productPath}/${id}`);
      } catch (err) {
        console.log(err);
      }
      this.GetAllUsers();
    },
    async handleSubmit(form) {
      if (!ValidateForm(form)) {
        this.ErrorForm = true;
        return;
      }
      this.ErrorForm = false;
      try {
        await SendRequest(productPath, {
          ...form,
        });
      } catch (err) {
        console.error(err);
      }
      this.GetAllUsers();
    },
    async handleUpdate(form) {
      try {
        await SendRequest(`${productPath}/${this.form.id}`, form, "PUT");
      } catch (err) {
        console.log(err);
      }
      this.GetAllUsers();
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
    },
  },
  mounted() {
    this.GetAllUsers();
  },
  components: { Modal, Form, Table, Pages, ButtonCrud },
};
</script>
