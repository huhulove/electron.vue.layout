<template>
	<div class="theme-select-container">
		<el-dialog :modal="false" :show-close="false" :visible.sync="themeDialogShow" width="46%">
			<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2" size="small"></el-input>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			themeDialogShow: true,
			input2: null
		};
	},
	methods: {
		/* preventDefault(ev) {
			ev.stopPropagation();
		} */
	}
};
</script>

<style lang="less">
.theme-select-container {
	/deep/ .el-dialog {
		margin-top: 0.1vh !important;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			padding: 6px;
		}
	}
}
</style>
