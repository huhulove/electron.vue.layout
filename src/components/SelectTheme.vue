<template>
	<div class="theme-select-container" @click="preventDefault">
		<el-dialog :modal="false" :show-close="false" width="46%" v-bind="$attrs" v-on="$listeners">
			<div class="search-theme">
				<el-input placeholder="选择颜色主题" autofocus v-model="themeKey" size="small"></el-input>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>Light (Visual Studio)</span>
					<el-button style="float: right; padding: 3px 0" type="text">浅色主题</el-button>
				</div>
				<div class="text item" v-for="(item, index) in lightThemeData" :key="index">
					{{ item.name }}
				</div>
			</el-card>
			<el-divider></el-divider>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>Dark (Visual Studio)</span>
					<el-button style="float: right; padding: 3px 0" type="text">深色主题</el-button>
				</div>
				<div class="text item" v-for="(item, index) in darkThemeData" :key="index" @click="clickTheme">
					{{ item.name }}
				</div>
			</el-card>
		</el-dialog>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {
			themeDialogShow: true,
			themeKey: null,
			lightThemeData: [
				{
					name: 'Light+ (Default Light)'
				},
				{
					name: '苹果绿'
				}
			],
			darkThemeData: [
				{
					name: 'Dark+ (Default Light)'
				},
				{
					name: '暗夜黑'
				}
			]
		};
	},
	methods: {
		preventDefault(ev) {
			ev.stopPropagation();
		},
		clickTheme() {
			this.$emit('update:visible', false);
		}
	}
};
</script>

<style lang="less">
.theme-select-container {
	/deep/ .el-dialog {
		margin-top: 0.1vh !important;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
		background: #f3f1f1;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			padding: 0px 0px 6px 0px;
			.search-theme {
				padding: 2px 8px;
			}
			.el-card {
				box-shadow: none;
				border-top: none;
				background: none;
				font-size: 13px;
				.el-card__header {
					padding: 2px 8px;
					line-height: 26px;
					&:hover {
						background-color: #cccccc;
						cursor: pointer;
					}
				}
				.el-card__body {
					.item {
						line-height: 26px;
						padding: 2px 8px;
						&:hover {
							background-color: #cccccc;
							cursor: pointer;
						}
					}
				}
			}
			.el-divider {
				margin: 0px;
				background-color: #cccccc;
			}
		}
	}
}
</style>
