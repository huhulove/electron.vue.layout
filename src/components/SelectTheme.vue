<template>
	<div class="theme-select-container" @click="preventDefault">
		<el-dialog :modal="false" :show-close="false" width="46%" v-bind="$attrs" v-on="$listeners">
			<div class="search-theme">
				<el-input
					placeholder="选择颜色主题"
					:autofocus="true"
					v-model="themeKey"
					size="small"
					@input="inputKey"
					@keydown.native="keySelect($event)"
				></el-input>
			</div>
			<template v-for="(item, index) in filterThemeData">
				<div class="theme-list" :key="index">
					<el-divider :key="index" v-if="item.label && index !== 0"></el-divider>
					<el-row class="item" :class="[themeIndex === index ? 'active' : '']" @click.native="clickTheme">
						<el-col :span="20">
							<span>{{ item.name }}</span>
						</el-col>
						<el-col :span="4">
							<el-button style="float: right; padding: 3px 0" type="text">{{ item.label }}</el-button>
						</el-col>
					</el-row>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {
			themeKey: null,
			themeIndex: -1,
			sourceThemeData: [
				{
					name: 'Light (Visual Studio)',
					label: '浅色主题',
					theme: '134273'
				},
				{
					name: 'Light+ (Default Light)',
					label: '',
					theme: ''
				},
				{
					name: '苹果绿',
					label: '',
					theme: ''
				},
				{
					name: 'Dark (Visual Studio)',
					label: '深色主题',
					theme: ''
				},
				{
					name: 'Dark+ (Default Light)',
					label: '',
					theme: ''
				},
				{
					name: '暗夜黑',
					label: '',
					theme: ''
				}
			],
			filterThemeData: []
		};
	},
	mounted() {
		this.filterThemeData = [...this.sourceThemeData];
	},
	methods: {
		preventDefault(ev) {
			ev.stopPropagation();
		},
		clickTheme() {
			this.$emit('update:visible', false);
		},
		inputKey() {
			if (!this.themeKey) {
				this.filterThemeData = [...this.sourceThemeData];
			} else {
				this.filterThemeData = this.sourceThemeData.filter(item => {
					const upperKey = this.themeKey.toUpperCase();
					const upperName = item.name.toUpperCase();
					return upperName.indexOf(upperKey) > -1;
				});
			}
		},
		keySelect({ keyCode }) {
			if (keyCode === 38) {
				if (this.themeIndex === 0) {
					this.themeIndex = this.sourceThemeData.length;
				}
				this.themeIndex--;
			}
			if (keyCode === 40) {
				if (this.themeIndex === this.filterThemeData.length - 1) {
					this.themeIndex = -1;
				}
				this.themeIndex++;
			}
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
				margin-top: 4px;
				.el-input__inner {
					padding: 0 6px;
				}
			}
			.theme-list {
				font-size: 13px;
				margin-top: 4px;
				.item {
					line-height: 22px;
					padding: 2px 10px;
					&.active,
					&:hover {
						background-color: #cccccc;
						cursor: pointer;
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
