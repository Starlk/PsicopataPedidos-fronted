<template>
  <header class="bg-dark shadow p-2 mb-4">
    <h1 class="text-white text-center">Usuarios</h1>
  </header>
  <section class="container mt-3">
    <div class="row justify-content-center  align-items-start">
      <div class="col-12 col-lg-4 align-self-start mb-5">
        <form class="p-4 shadow rounded" @submit="handleForm">
          <h1 class="fs-3 text-center mb-3">
            {{ isUpdate ? "Update user" : "Create user" }}
          </h1>
          <GroupForm
            Group-label="name"
            Group-Id="name"
            @handleChange="handleChange"
          />
          <GroupForm
            Group-label="lastName"
            Group-Id="lastName"
            @handleChange="handleChange"
          />
          <GroupForm
            Group-label="email"
            Group-Id="email"
            @handleChange="handleChange"
          />

          <GroupForm
            Group-label="password"
            Group-Id="password"
            @handleChange="handleChange"
          />
          <GroupForm
            Group-label="wallet"
            Group-Id="wallet"
            @handleChange="handleChange"
            Input-Type="number"
          />
          <div class="col col-12 justify-content-center">
            <input
              type="submit"
              class="btn btn-outline-success text-center shadow btnForm"
              :value="isUpdate ? 'Update user' : 'Create user'"
            />
            <p v-if="ErrorForm" class="text-danger text-center mt-3">
              Completed the form before send it
            </p>
          </div>
        </form>
      </div>

      <div class="col-12 col-lg-7">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col text-center">#</th>
              <th scope="col text-center">name</th>
              <th scope="col text-center">LastName</th>
              <th scope="col text-center">email</th>
              <th scope="col text-center">wallet</th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in response">
            <tr>
              <th scope="row">{{ index }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.wallet }}</td>
              <td>
                <button class="btn btn-outline-success mb-2" @click="OnFormUpdate(user)"> 
                  Update
                 </button> 
                 <button class="btn btn-outline-danger" @click="handleClick(user.id)"> 
                  Delete
                 </button> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import GroupInput from "../components/GroupInput.vue";
import GroupForm from "../components/GroupForm.vue";
import { GetRequest, SendRequest, DeleteRequest } from "../helper/HttpHelper";
import { userPath } from "../constant/PathAPI";
import ValidateForm from "../helper/ValidateFormHelper";
import { AlertMessage } from "../helper/Alerts";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  wallet: 0,
};
export default {
  data() {
    return {
      response: [],
      form: initialForm,
      isUpdate: false,
      id: 0,
      ErrorForm: false,
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
    async handleSubmit() {
        if(!ValidateForm(this.form)){
          this.ErrorForm = true
          return;
        }
        this.ErrorForm = false;
       try {
         await SendRequest(userPath, {
           ...this.form,
           ["isAdmin"]: "false",
         });
       } catch (err) {
         console.error(err);
       }
       this.GetAllUsers();

     this.$swal({
       title:"Usuario guardado",
       icon:"success"
     });
    },
    async handleUpdate() {
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
  },
  mounted() {
    this.GetAllUsers();
  },
  components: { GroupInput, GroupForm },
};
</script>

<style>
.btnForm {
  margin-top: 0.5em;
  display: block;
  margin: 0 auto;
}

.icon__trash{
  widows: 20px;
  height: 20px;
  margin-bottom: 10px;
  
}


</style>
