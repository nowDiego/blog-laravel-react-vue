<template>
   
  <div class= "w-screen h-screen flex justify-center items-center bg-red-700 ">
    
    <form class="flex flex-col justify-center items-center gap-2 rounded bg-white w-96 h-1/2 p-5">
      
      <span class="text-center font-bold text-xl pb-4">Denuncia RJ</span>
      <input  class="w-full  border-red-400 " type="text" name="name" id="name" placeholder="Usuário" v-model="name">
     
       <input class="w-full  border-red-400" type="password" name="password" id="password" placeholder="Senha" v-model="password"> 

      <button  class="w-full h-8  bg-red-600 hover:bg-red-900 text-white font-semibold rounded " @click="login">Logar</button>

     <div class="message w-full mt-2 font-semibold text-center" >
      {{response.message}}
     </div>


    </form>


  </div>
</template>

<script>

import axios from "../axios/index";

export default { 
    

name:"LoginView",

data(){
return {
name:"",
password:"",
response:{
  status:false,
  message:""
}
}
},

methods:{

 async login(event) {
       event.preventDefault()

 let self = this;

    await axios.post("/login", {
          name: this.name,
          password: this.password,
        })
        .then(function (response) {
            if(response.data.status)
            {
                  
        localStorage.setItem("_token", response.data.access_token);
        self.$router.push({ name: "dashboard" });
                   
          }else{
            self.response.status = false
            self.response.message = response.data.message
          }
        
        })
        .catch(function (error) {
          console.log(error);
             self.response.message = "Login inválido"
        });
       


 }


}



}
</script>

<style>

</style>