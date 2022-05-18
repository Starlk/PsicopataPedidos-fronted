<template class="template__login">
  <div class="body">
    <section class="main">
      <section class="login">
        <h1 class="login__title">Log In</h1>
        <form @submit="handleSubmit">
          <GroupInput
            Group-label="email"
            Group-Id="email"
            @handleChange="handleChange"
            ClassName="login__group"
          />
        <GroupInput
            Group-label="password"
            Group-Id="password"
            ClassName="login__group"
            @handleChange="handleChange"
          />

         
            <input
              type="submit"
              value="Ingresar"
              class="btn btn-outline-success"/>
     
        </form>
      </section>
    </section>
  </div>
</template>




<script>
import GroupInputVue from "../components/GroupInput.vue";
import { RouterLink } from "vue-router";
import GroupInput from "../components/GroupInput.vue";
import PathName from "../router/PathName";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      fetch("https://localhost:7103/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      }).then((data) => console.log(data.response));
    },

    handleChange(name, value){
        this.form ={...this.form, [name]:value}
    }
    ,
  },
  computed: {},
  components: { GroupInputVue, GroupInput },
};
</script>

<style>
.body {
  display: flex;
  background-color: rgba(62, 62, 62, 0.702);
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
  box-shadow: 2px 0px 9px 1px rgb(0, 0, 0, 0.5);
}
.login__title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: black;
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
</style>
