<template>
  <section class="container-fluid contain">
    <section class="row">
      <section class="col col-12 col-lg-7 p-3">
        <h1>Register</h1>
        <p>
          Welcome sign up with us for getting the best services, the best
          product and all varienty from starlk's shopping
        </p>
        <div class="container p-4">
          <div class="row">
            <section class="col col-12 col-lg-6">
              <GroupInput
                Group-label="Enter your name"
                Group-id="name"
                @handleChange="handleChange"
                Group-Title="Name"
                type="text"
                :input="form.name"
              />

              <GroupInput
                Group-label="Enter your Last Name"
                Group-id="lastName"
                @handleChange="handleChange"
                Group-Title="Last Name"
                type="text"
                :input="form.lastName"
              />
              <GroupInput
                Group-label="Enter your Email"
                Group-id="email"
                @handleChange="handleChange"
                Group-Title="Email"
                type="text"
                :input="form.email"
              />
            </section>
            <section class="col col-12 col-lg-6">
              <GroupInput
                Group-label="Enter your Password"
                Group-id="password"
                @handleChange="handleChange"
                Group-Title="Password"
                type="password"
                :input="form.password"
              />
              <GroupInput
                Group-label="Repeat your password"
                :Group-id="IsPasswordValided"
                @handleChange="(name, value) => (PasswordValidate = value)"
                Group-Title="Repeat password"
                type="password"
                :input="PasswordValidate"
              />
              <GroupInput
                Group-label="Enter your initial wallet"
                Group-id="wallet"
                @handleChange="handleChange"
                Group-Title="Wallet"
                type="number"
                :input="form.wallet"
              />
            </section>
          </div>

          <section class="col">
            <button class="btn__register" @click="handleSubmit">
              Register
            </button>
            <p class="text-danger fs-2 text-center">{{ ErrorMessage }}</p>
          </section>
        </div>
      </section>
      <section class="col col-12 col-lg-5 col-full-heigth align-self-center">
        <img src="../assets/Shopping.svg" class="register__img" />
      </section>
    </section>
  </section>
</template>

<script>
import GroupInput from "../components/GroupInput.vue";
import HandleChange from "../helper/HandleChangeHelper";
import initialForm from "../modals/initialFormUser";
import FormConstant from "../constant/FormConstant";
import ValidateForm from "../helper/ValidateFormHelper";
import EmailValidate from "../helper/RegexForm";
import { SendRequest } from "../helper/HttpHelper";
import { userPath } from "../constant/PathAPI";
const { IsPasswordValided } = FormConstant;
export default {
  data() {
    return {
      form: initialForm,
      IsPasswordValided,
      PasswordValidate: "",
      FormError: false,
      ErrorMessage: "",
    };
  },

  methods: {
    handleChange(name, value) {
      if (name !== IsPasswordValided)
        this.form = HandleChange(this.form, name, value);
    },
    ValidatedPassword() {
      return this.form.password !== this.PasswordValidate;
    },
    handleSubmit() {
      if (!ValidateForm(this.form)) {
        this.AlertError(true, "You should completed fields");
        return;
      }
      if (this.ValidatedPassword()) {
        this.AlertError(
          true,
          "Passwords are different, you should sure writting the correct password in both case"
        );
        return;
      }
      if (EmailValidate(this.form.email)) {
        this.AlertError(true, `${this.form.email} is not an email valid!`);
        return;
      }
      this.AlertError(false);
      try{
          SendRequest(userPath,this.form)
      }catch(err){
          console.log(err)
          this.AlertError(true,"Failed request")
      }
    },
    AlertError(isErr = false, mess = "") {
      (this.FormError = isErr), (this.ErrorMessage = mess);
    },
  },
  components: { GroupInput },
};
</script>

<style>
.container-fluid {
  height: 100vh;
  width: 100%;
}
.col-full-heigth {
  height: 100vh;
  background-color: #0aa1dd;
}

.btn__register {
  background-color: #0aa1dd;
  border-radius: 5px;
  border-style: none;
  padding: 0.5em 1em;
  display: block;
  width: 80%;
  margin: 0 auto;
  color: rgb(248, 238, 238);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  margin-bottom: 20px;
}

.register__img {
  max-width: 100%;
}
</style>
