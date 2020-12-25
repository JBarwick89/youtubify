import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

const channelVideoListComponent = () => import('@/components/channelVideoList.vue');
const channelSearchComponent = () => import('@/components/ChannelSearch.vue');
const loginComponent = () => import('@/components/Login.vue');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/ChannelSearch',
    name: 'ChannelSearch',
    component: channelSearchComponent
  },
  {
    name: 'channelVideoList',
    path: '/channelVideoList/:channelId',
    component: channelVideoListComponent,
    props: true,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount("#app");

Vue.use(VueAxios, axios);
