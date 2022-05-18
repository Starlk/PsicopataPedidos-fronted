<script>
    import { RouterLink } from "vue-router";
    export default {
        data(){
            return{
                form:{
                    name:"",
                    lastName:"",
                    email:"",
                    password:"",
                    wallet:0
                }
            }
        },

        methods:{
            handleSubmit(e){
                  e.preventDefault(); 
                  fetch("https://localhost:7103/api/user",{
                      method:"POST",
                       headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({...this.form,['isAdmin']:"false"})
                  }).then(datos=>console.log(datos.status))

            }
        }
    }
</script>

<template>
    <h1>Creamos usuario</h1>
    <RouterLink to="/Users" class="btn btn-primary">Back</RouterLink>
    <div class="container w-50">
        <form class="row g-3" @submit="handleSubmit">
            <div class="row mb-4">
                <label for="name" class="text-center fs-3">Name</label>
                <input id="name" type="text" placeholder="...." v-model="form.name"/>
            </div>
             <div class="row mb-4">
                <label for="LastName" class="text-center fs-3">Last Name</label>
                <input id="lastName" type="text" placeholder="...."
                v-model="form.lastName"/>
            </div>
            <div class="row mb-4">
                <label for="email" class="text-center fs-3">Email</label>
                <input id="email" type="text" placeholder="...." v-model="form.email"/>
            </div>
             <div class="row mb-4">
                <label for="pass" class="text-center fs-3">Password</label>
                <input id="pass" type="password" placeholder="...." v-model="form.password"/>
            </div>
            <div class="row">
                <label for="wallet" class="text-center fs-3">Wallet</label>
                <input id="wallet" type="number" placeholder="...." v-model="form.wallet"/>
            </div>
            <input type="submit" class="btn btn-primary shadow"/>
        </form>
    </div>
</template>