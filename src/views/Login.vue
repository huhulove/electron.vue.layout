<template>
	<div class="login-container" style="-webkit-app-region: drag">
		<menu-login></menu-login>
		<div class="login-box">
			<el-form class="login-form" ref="loginForm" :model="loginFormData" :rules="loginFormRules" size="small">
				<el-form-item label="" prop="uname">
					<el-input v-model="loginFormData.uname" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="loginFormData.password" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-button type="primary" class="submit-button" @click="login" size="small">登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
import MenuLogin from '../components/menu.login';

const { ipcRenderer } = window.require('electron');
export default {
	components: {
		MenuLogin
	},
	data() {
		return {
			loginFormData: {
				uname: null,
				password: null
			},
			loginFormRules: {
				uname: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		login() {
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					ipcRenderer.send('openMainWindow');
				}
			});
		}
	}
};
</script>

<style lang="less">
form {
	-webkit-app-region: no-drag;
}
.login-container {
	width: 100%;
	height: 330px;
	background: linear-gradient(to bottom, #152f3e, #1f415a);
	position: relative;
	.login-box {
		width: 100%;
		height: 200px;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #ffffff;
		overflow: hidden;
		.login-form {
			width: 280px;
			margin: 36px auto 0;
		}
		.submit-button {
			margin-top: 0px;
			width: 100%;
		}
	}
}
</style>
