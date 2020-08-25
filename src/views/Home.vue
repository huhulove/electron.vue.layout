<template>
	<div class="home" @click="clickDoc">
		首页
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<SelectTheme v-if="isShowSelectTheme"></SelectTheme>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import SelectTheme from '@/components/SelectTheme.vue';

export default {
	name: 'Home',
	components: {
		HelloWorld,
		SelectTheme
	},
	data() {
		return {
			isShowSelectTheme: false
		};
	},
	mounted() {
		this.$ipcRenderer.on('showThemeSelect', () => {
			this.isShowSelectTheme = true;
		});
		this.$ipcRenderer.on('hideThemeSelect', () => {
			this.isShowSelectTheme = false;
		});
	},
	methods: {
		clickDoc() {
			this.isShowSelectTheme = false;
		}
	}
};
</script>

<style lang="less">
.home {
	width: 100%;
	height: 100%;
}
</style>
