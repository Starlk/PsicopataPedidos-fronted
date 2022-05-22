<template>
  <Pages @openModal="openModal">
    <Table :titlesProp="['Name ', 'Last Name', 'Email', 'Wallet']">
      <tr v-for="(user, index) in response">
        <td>{{ user.name }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.wallet }}</td>
        <td>
          <ButtonCrud @Click="() => openModalUpdate(user)">Update</ButtonCrud>
          <ButtonCrud @Click="() => handleDelete(user.id)">Delete</ButtonCrud>
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
import { GetRequest, SendRequest, DeleteRequest } from "../../helper/HttpHelper";
import { userPath } from "../../constant/PathAPI";
import ValidateForm from "../../helper/ValidateFormHelper";
import Modal from "../../components/Modal.vue";
import Form from "../../components/Form.vue";
import users from "../../json/users.json";
import initialForm from "../../modals/initialFormUser";
import Table from "../../components/Table.vue";
import Pages from "../../components/PagesControl.vue";
import ButtonCrud from "../../components/ButtonCrud.vue";
import HandleChange from "../../helper/HandleChangeHelper";
export default {
  data() {
    return {
      response: [],
      form: initialForm,
      isModalOpen: false,
      arrayForm: users,
      isUpdate: false,
    };
  },
  methods: {
    async GetAllUsers() {
      try {
        const Users = await GetRequest(userPath);
        this.response = [...Users];
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(id) {
      try {
        await DeleteRequest(`${userPath}/${id}`);
      } catch (err) {
        console.log(err);
      }
      this.GetAllUsers();
    },
    async handleSubmit(form) {
      console.log("desde el padre se ejecuto");
      if (!ValidateForm(form)) {
        this.ErrorForm = true;
        return;
      }
      this.ErrorForm = false;
      try {
        await SendRequest(userPath, {
          ...form,
          ["isAdmin"]: "false",
        });
      } catch (err) {
        console.error(err);
      }
      this.GetAllUsers();
    },
    async handleUpdate(form) {
      try {
        await SendRequest(`${userPath}/${this.form.id}`, form, "PUT");
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
      this.form = initialForm
    },
  },
  mounted() {
    this.GetAllUsers();
  },
  components: { Modal, Form, Table, Pages, ButtonCrud },
};
</script>
