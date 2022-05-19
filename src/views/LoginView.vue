<template class="template__login">
  <h1 class="title">By: Starlk</h1>
  <div class="body">
    <section class="main">
      <section class="login">
        <h1 class="login__title">Welcome Back</h1>
        <p>Welcome back! please enter your details</p>
        <form @submit="handleSubmit">
          <GroupInput
            Group-label="Enter you email"
            Group-Id="email"
            @handleChange="handleChange"
            Group-Title="Email"
            type="text"
            :input="form.email"
          />
          <GroupInput
            Group-label="******"
            Group-Id="password"
            @handleChange="handleChange"
            Group-Title="password"
            type="password"
            :input="form.password"
          />

          <input type="submit" value="Ingresar" class="login__btn" />
        </form>
        <RouterLink to="/Register"></RouterLink>
        <h2 class="login__register">
          Don't have an account ?<RouterLink to="/Register"
            ><span>Sign Up</span></RouterLink
          >
        </h2>
        <p v-if="ErrorUser" class="text-danger text-center mt-3 absolute">
          Usuario no existe
        </p>
        <p v-if="ErrorForm" class="text-danger text-center mt-3 absolute">
          Debe completar los formularios, para enviar
        </p>
      </section>
    </section>
    <img src="../assets/security.svg" alt="login" class="body__background" />
  </div>
</template>

<script>
import GroupInputVue from "../components/GroupInput.vue";
import { RouterLink } from "vue-router";
import GroupInput from "../components/GroupInput.vue";
import PathName from "../router/PathName";
import { GetToken } from "../helper/HttpHelper";
import { userPath } from "../constant/PathAPI";
import { setItemToLocalStorage } from "../helper/LocalStorageHelper";
import ValidateForm from "../helper/ValidateFormHelper";
import router from "@/router";

const initialForm = { email: "", password: "" };

export default {
  data() {
    return {
      form: initialForm,
      ErrorUser: false,
      ErrorForm: false,
      toke: "",
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      if (!ValidateForm(this.form)) {
        this.ErrorForm = true;
        return;
      }
      this.ErrorUser = false;
      this.ErrorForm = false;
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.form),
      };
      try {
        const datos = await GetToken(`${userPath}/Login`, options);
        if (datos) {
          setItemToLocalStorage(datos);
          this.login();
        }
      } catch (err) {
        this.ErrorUser = true;
        this.form = initialForm;
      }
    },
    login() {
      router.push({ path: "/Users", replace: true });
    },

    handleChange(name, value) {
      this.form = { ...this.form, [name]: value };
    },
  },
  computed: {},
  components: { GroupInputVue, GroupInput },
};
</script>

<style>
.title {
  position: absolute;
  font-size: 0.9rem;
  margin-left: 2em;
  top: 10px;
}
.body {
  display: flex;
  background-color: #e8f9fd;
  height: 100vh;
  justify-content: left;
}
.main {
  background-color: white;
  align-self: stretch;
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 34px 10px 41px -21px rgba(0, 0, 0, 0.39);
}
.login__title {
  text-align: left;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  color: black;
}
.login__title + p {
  opacity: 0.5;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
}

.login__submit {
  padding: 0.3em;
  border-radius: 5px;
  width: 100%;
  background-color: transparent;
  border-color: #92b4ec;
  border-style: solid;
  border-width: 2px;
  color: #92b4ec;
  box-shadow: 10px 7px 11px -7px rgba(92, 77, 77, 0.75);
}
.absolute {
  position: absolute;
}

.login__btn {
  background-color: #0aa1dd;
  border-radius: 5px;
  border-style: none;
  padding: 0.5em 1em;
  display: block;
  width: 100%;
  margin: 0 auto;
  color: rgb(248, 238, 238);
  box-shadow: -11px 30px 45px -22px rgba(0, 0, 0, 0.62);
  margin-bottom: 20px;
}

.login__register {
  font-size: 1rem;
  opacity: 0.6;
  text-align: center;
}
.login__register span {
  color: #0aa1dd;
}
.login__register span:hover {
  cursor: pointer;
}
.body__background {
  max-width: 45%;
  text-align: center;
}

@media screen and (max-width: 720px) {
  .main {
    width: 100%;
    height: 100vh;
  }
}
</style>
