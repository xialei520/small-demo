import './weui.css';
 
import xheader from './components/xheader.vue';
const Vue = require('vue');
import VueRouter from 'vue-router';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(VueRouter);
// 组件
// import a from './components/a.vue';
// import b from  './components/b.vue';
const a = require('./components/a.vue');
const b = require('./components/b.vue')

// import Vue from 'vue';
let router = new VueRouter({
    routes: [{
        path: '/',
        components: a
    },{
        path: '/index',
        components: a
    }, {
        path: '/home',
        components: b
    }]
})
let store = new Vuex.Store({
    state: {
        name: '夏磊',
        title: 'hangzhou'
    },
    mutations: {
        setName(state, data){
            console.log('1111')
            console.log(state, data);
            console.log('1111')
            state.title = data;
        }
    }
})
const app = new Vue({
    el: '#app',
    router,
    store,
    data: {

    },
    template: `
        <div>
            <xheader></xheader>
            <router-view></router-view>
        </div>
    `,
    components: {
        xheader: xheader
    }
})