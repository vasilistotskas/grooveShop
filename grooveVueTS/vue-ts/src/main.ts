import { i18n } from '@/locales'
import { createApp } from 'vue'
import router from '@/routes'
import store from './store'
import axios from 'axios'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import AppBase from '@/layouts/AppBase.vue'

const ToastOptions: PluginOptions = {
    // You can set your default options here
};

axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(AppBase)
    .use(store)
    .use(router, axios)
    .use(i18n)
    .use(Toast, ToastOptions)
    .mount('#app')
