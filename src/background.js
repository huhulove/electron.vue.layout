import { app, protocol } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

import createLoginWindow from './window/login/login.window';
import monitor from './window/monitor';
import store from './plugins/data';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

let winLogin;
let isInstall;
let autoUpdate;

// 当所有窗口关闭时则退出应用
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		isInstall && autoUpdate.quitAndInstall();
		app.quit();
	}
});

app.on('activate', () => {
	// 当在 MAC 机器上直接点击图标不会打开应用窗口时，执行以下语句
	if (winLogin === null) {
		// 创建登录窗口
		winLogin = createLoginWindow();
	}
});

// 应用初始化完成和新创建的窗口加载完毕后调用此方法, 当此方法执行后可以调用很多api
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// 安装 vue 开发工具
		try {
			await installExtension(VUEJS_DEVTOOLS);
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}
	// 创建登录窗口
	winLogin = createLoginWindow();
	// 开启监听
	const r = await monitor(winLogin);
	if (r && r.event === 'openMainWindow') {
		isInstall = r.isInstall;
		autoUpdate = r.autoUpdate;
	}
	console.log(store.get('theme'));
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
