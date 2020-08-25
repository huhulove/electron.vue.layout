import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/elementUI';

const { ipcRenderer } = window.require('electron');

Vue.prototype.$ipcRenderer = ipcRenderer;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
