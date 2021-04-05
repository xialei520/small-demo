import Vue from 'vue';
import App from './App';
import routes from './routes';
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')