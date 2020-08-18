<template>
	<div id="app">
        <button @click="showUpdater">更新</button>
		<div id="nav">
			<router-link to="/">Home</router-link>
			|
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
const { ipcRenderer } = window.require('electron');

export default {
	mounted() {
		ipcRenderer.on('message', (event, obj) => {
			console.log(event);
			console.log(obj);
		});
	},
	methods: {
		showUpdater() {
			this.showUpdate = true;
			ipcRenderer.send('checkForUpdate');
		}
	}
};
</script>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
