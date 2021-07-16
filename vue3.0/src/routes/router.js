import A from '../components/A.vue';
import B from '../components/B.vue';
import C from '../components/C.vue';
import D from '../components/D.vue';
import {
    createRouter,
    createWebHashHistory
} from 'vue-router';


const routes = [{
        path: '/',
        name: '/',
        component: A
    },
    {
        path: 'A',
        name: 'A',
        component: A
    },
    {
        path: 'B',
        name: 'B',
        component: B
    },
    {
        path: 'C',
        name: 'C',
        component: C
    },
    {
        path: 'D',
        name: 'D',
        component: D
    }
];

const router = createRouter({
    history: createWebHashHistory,
    routes
})
export default router;