<template>
	<div class="menu-container">
		<el-row>
			<el-col :span="4" :offset="20">
				<el-button type="text" icon="el-icon-minus" @click.native="minWindow"></el-button>
				<el-button type="text" icon="el-icon-close" @click.native="maxWindow"></el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
const { ipcRenderer } = window.require('electron');

export default {
	methods: {
		minWindow() {
			ipcRenderer.send('minLoginWindow');
		},
		maxWindow() {
			ipcRenderer.send('maxLoginWindow');
		}
	}
};
</script>

<style lang="less">
button {
	-webkit-app-region: no-drag;
}
.menu-container /deep/ .el-button--text {
	font-size: 18px;
	color: rgba(255, 255, 255, 0.6);
	text-align: center;
	margin: 0 6px;
}
</style>
