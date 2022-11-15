<template>
  <div> 
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="overflow-auto	 min-width border-0 rounded-lg shadow-lg relative flex flex-col min-w-max w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
           {{post.title}}
            </h3>
            <button class="p-1 ml-auto border-0 text-black hover:text-gray-700 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                  <Close/>            
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-slate-500 text-lg leading-relaxed">               
                {{post.content}}
            </p>
            <section v-if="post.photo" class="flex justify-center">
              <img class="w-2/3"  :src="`http://localhost:8000/storage/${post.photo}`"  :alt="post.title">
            </section>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="toggleModal()">
              Fechar
            </button>
           
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"  @click="teste()"></div>
  </div>
</template>

<script>
import Close from 'vue-material-design-icons/Close.vue';

export default {
  name: "ModalDetail",
  data() {
    return {    
    }
  },
  methods: {   
   
  },
  props: {
    post:Object,
    showModal: Boolean,
     toggleModal: { type: Function },
  },
  components:{
    Close
  }
}

</script>
<style scoped>
.min-width{
  min-width: 600px;
  min-height: 300px;
  max-width: 900px;
  max-height: 500px;

}
</style>