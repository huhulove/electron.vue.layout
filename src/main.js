import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* 引入插件 */
import './plugins/elementUI';
import './plugins/theme';

const { ipcRenderer } = window.require('electron');

Vue.prototype.$ipcRenderer = ipcRenderer;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => {
		return h(App);
	}
}).$mount('#app');
