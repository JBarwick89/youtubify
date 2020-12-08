import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'

new Vue({
    render: h => h(App)
}).$mount("#app");

Vue.use(VueAxios, axios);
