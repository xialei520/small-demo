import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import gesture from '@/components/gesture'
import socket from '@/components/socket'



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/gesture',
            name: 'gesture',
            component: gesture
        },
        {
            path: '/gesture',
            name: 'gesture',
            component: gesture
        },
        {
            path: '/socket',
            name: 'socket',
            component: socket
        }
    ]
})
