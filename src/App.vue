<template>
	<div id="app">
        <el-button type="primary">立即更新</el-button>
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
import updateMixin from './mixins/update.mixin';

export default {
	mixins: [updateMixin]
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
