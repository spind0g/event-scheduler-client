import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.baseURL = 'https://aa-event-scheduler-api.herokuapp.com/api';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
