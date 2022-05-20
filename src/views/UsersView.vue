<template>
  <header class="bg-primary shadow p-2 mb-4">
    <h1 class="text-white text-center fs-3">Usuarios</h1>
  </header>
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
        <table class="table table-primary">
          <thead class="thead-dark">
            <tr>
              <th scope="col text-center">Name</th>
              <th scope="col text-center">Last Name</th>
              <th scope="col text-center">Email</th>
              <th scope="col text-center">Wallet</th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in response">
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.wallet }}</td>
              <td>
                <button
                  class="btn btn-outline-success mb-2"
                  @click="OnFormUpdate(user)"
                >
                  Update
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="handleClick(user.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
export default {
  data() {
    return {
      response: [],
      form: initialForm,
      isUpdate: false,
      id: 0,
      ErrorForm: false,
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
    async handleClick(id) {
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
    async handleSubmit(form) {
      console.log("desde el padre se ejecuto")
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
    async handleUpdate() {
      window.scrollTo(0, 0);
      try {
        await SendRequest(`${userPath}/${this.id}`, this.form, "PUT");
      } catch (err) {
        console.log(err);
      }
      this.OffFormUpdate();
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
  },
  mounted() {
    this.GetAllUsers();
  },
  components: { GroupInput, GroupForm, Modal, Form },
};
</script>
