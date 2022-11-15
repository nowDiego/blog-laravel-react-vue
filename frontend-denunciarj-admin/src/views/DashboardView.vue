<template>
  <HeaderComponent></HeaderComponent>

  <div
    class="w-full flex justify-center items-center"
    v-if="!Object.keys(posts).length == 0"
  >
    <table class="w-2/3 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="
          text-xs text-gray-700
          uppercase
          bg-gray-50
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <tr>
          <th scope="col" class="py-3 px-6">#</th>
          <th scope="col" class="py-3 px-6">Título</th>
          <th scope="col" class="py-3 px-6">Categoria</th>
          <th scope="col" class="py-3 px-6">Status</th>
          <th scope="col" class="py-3 px-6"></th>
          <th scope="col" class="py-3 px-6"></th>
          <th scope="col" class="py-3 px-6"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="item in posts"
          :key="item.id"
        >
          <td class="py-4 px-6">{{ item.id }}</td>
          <td class="py-4 px-6">{{ item.title }}</td>
          <td class="py-4 px-6">{{ item.category.category }}</td>
          <td class="py-4 px-6">{{ item.status_post.status }}</td>

          <td class="py-4 px-6">
            <button
              type="button"
              class="bg-red-700 hover:bg-red-900 text-white px-8 py-2 rounded"
              @click="handleDelete(item)"
            >
              <Delete />
            </button>
          </td>

          <td class="py-4 px-6">
            <button
              type="button"
              class="bg-red-700 hover:bg-red-900 text-white px-8 py-2 rounded"
              @click="handleDetail(item)"
            >
              <Eye />
            </button>
          </td>

          <td class="py-4 px-6">
            <button
              v-if="item.status_post.status == 'Ativo'"
              type="button"
              class="bg-red-700 hover:bg-red-900 text-white px-8 py-2 rounded"
              @click="handleStatus(item)"
            >
              Desativar
            </button>

            <button
              v-if="item.status_post.status == 'Desativo'"
              type="button"
              class="bg-red-700 hover:bg-red-900 text-white px-8 py-2 rounded"
              @click="handleStatus(item)"
            >
              Ativar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <div class="w-full h-screen flex justify-center items-center" v-if="load">
      <div aria-label="Loading..." role="status">
        <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
          <path
            class="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            class="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="w-full h-screen flex justify-center items-center" v-else>
      <div>
        <p class="font-semibold">Nenhuma postagem encontrada!</p>
      </div>
    </div>
  </div>

  <ModalDetail
    :post="postDetail"
    :showModal="showModal"
    :toggleModal="toggleModal"
  />
</template>

<script>
import axios from "../axios/index";
import ModalDetail from "../components/ModalDetail.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import Eye from "vue-material-design-icons/Eye.vue";

export default {
  name: "DashboardView",

  data() {
    return {
      posts: {},
      showModal: false,
      postDetail: {},
      load: false,
    };
  },

  components: {
    ModalDetail,
    HeaderComponent,
    Delete,
    Eye,
  },

  created() {
    this.loadPost();
  },

  methods: {
    async loadPost() {
      let self = this;

      self.load = true;

      await axios
        .get("/post/all", {
          name: this.name,
          password: this.password,
        })
        .then(function (response) {
          if (response.data.status) {
            self.posts = response.data.data;
            self.load = false;
          }
          self.load = false;
        })
        .catch(function (error) {
          console.log(error);
          self.load = false;
        });
    },

    async handleDetail(post) {
      this.showModal = true;
      this.postDetail = post;
    },

    async handleDelete(item) {
      let self = this;

      await axios
        .delete(`/post/delete/${item.id}`)
        .then(function (response) {
          if (response.data.status) {
            self.posts = self.posts.filter((post) => {
              return post.id != item.id;
            });
          }
          self.snackbarMessage(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
          self.snackbarMessage("Ocorreu um erro.Por favor, tente novamente");
        });
    },

    async handleStatus(item) {
      let self = this;

      await axios
        .patch(`/post/update/${item.id}`, {
          status: item.status_post.status,
        })
        .then(function (response) {
          if (response.data.status) {
            self.posts = self.posts.filter((post) => {
              return post.id != item.id;
            });

            self.posts.unshift(response.data.data);
          }

          self.snackbarMessage(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
          self.snackbarMessage("Ocorreu um erro.Por favor, tente novamente");
        });
    },

    snackbarMessage(message) {
      this.$snackbar.add({
        type: "success",
        text: message,
      });
    },

    toggleModal: function () {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style>
</style>