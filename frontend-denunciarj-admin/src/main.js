import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";

createApp(App).component("vue3-snackbar", Vue3Snackbar).use(SnackbarService).use(store).use(router).mount('#app')
