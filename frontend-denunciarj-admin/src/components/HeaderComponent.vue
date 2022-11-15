<template>
  <header class="w-full mb-5">  
  
  <nav class="flex w-full h-14 bg-red-600 text-white">
    <div class="brand flex w-1/3  items-center ">
         <span class="p-2 pl-7 font-semibold text-xl">Denuncia RJ  <span class="font-semibold text-sm text-yellow-300">Admin</span> </span> 
       

    </div>
    <div class="menu w-2/3 flex justify-end	">
       
        <ul class="flex justify-center items-center font-medium	">
                     
             <li class="p-2 px-5 hover:text-yellow-300	">
                <button @click="logout"
                >
              <Logout/>
              
                </button>
            </li>

        </ul>

    </div>
  </nav>

   </header>

</template>

<script>

import Logout from 'vue-material-design-icons/Logout.vue';


export default {

methods:{
  async logout(){
   let self = this;
  localStorage.removeItem('_token');
  self.$router.push({ name: "login" });
  
  }
},
components:{
  Logout,
  
}


}
</script>

<style>

</style>