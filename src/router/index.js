import Vue from 'vue';
import VueRouter from 'vue-router';
import Events from '../views/Events.vue';
import Event from '../views/Event.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Events',
        component: Events,
    },

    {
        path: '/event',
        name: 'Event',
        component: Event,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
