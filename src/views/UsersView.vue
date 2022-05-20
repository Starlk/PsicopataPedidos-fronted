<template>
  <section class="container mt-3">
    <div class="row justify-content-end">
      <div class="col d-flex flex-row-reverse">
        <button
          class="btn btn-outline-success user__add--position"
          @click="openModal"
        >
          Add
        </button>
      </div>
    </div>
    <div class="row justify-content-center align-items-start">
      <div class="col-12 mt-3">
        <Table :titlesProp="['Name ', 'Last Name', 'Email', 'Wallet']">
          <tr v-for="(user, index) in response">
            <td>{{ user.name }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.wallet }}</td>
            <td>
              <button class="btn btn-outline-danger" @click="openModalUpdate(user)">Update</button>
              <button
                class="btn btn-outline-danger"
                @click="handleDelete(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </Table>
      </div>
    </div>
  </section>
  <Modal title="Creat users" v-if="isModalOpen" @closeModel="closeModal">
    <Form
      :fields="arrayForm"
      :InitialForm="form"
      btnName="Save user"
      @handleSubmit="handleSubmit"
    />
  </Modal>
  <Modal title="Update users" v-if="isUpdateModal" @closeModel="closeUpdateModal">
    <Form
      :fields="arrayForm"
      :InitialForm="form"
      btnName="Update user"
      @handleSubmit="handleUpdate"
    />
  </Modal>
</template>

<script>
import GroupInput from "../components/GroupInput.vue";
import GroupForm from "../components/GroupForm.vue";
import { GetRequest, SendRequest, DeleteRequest } from "../helper/HttpHelper";
import { userPath } from "../constant/PathAPI";
import ValidateForm from "../helper/ValidateFormHelper";
import Modal from "../components/Modal.vue";
import Form from "../components/Form.vue";
import users from "../json/users.json";
import initialForm from "../modals/initialFormUser";
import Table from "../components/Table.vue";
export default {
  data() {
    return {
      response: [],
      form: initialForm,
      isUpdateModal: false,
      isModalOpen: false,
      arrayForm: users,
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
    handleForm(e) {
      e.preventDefault();
      const execute = this.isUpdate ? this.handleUpdate : this.handleSubmit;
      execute();
    },
    openModalUpdate(users){
      this.form = {...users}
      this.isUpdateModal = true
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
    OnFormUpdate(user) {
      this.isUpdate = true;
      this.id = user.id;
      delete user.id;
      this.form = { ...user };
    },
    OffFormUpdate() {
      this.form = { ...initialForm };
      this.isUpdate = false;
    },
    handleChange(name, value) {
      this.form = { ...this.form, [name]: value };
    
    },

    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeUpdateModal(){
      console.log("lala")
      this.isUpdateModal = false
    }
  },
  mounted() {
    this.GetAllUsers();
  },
  components: { GroupInput, GroupForm, Modal, Form, Table },
};
</script>
