import { app, protocol, BrowserWindow, globalShortcut } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';

import customMenu from './window/menu.main';
import customTrayMenu from './window/menu.tray';
import checkVersion from './window/APPAutoUpdater';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let autoUpdate;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
	// 创建浏览器窗口
	win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, process.env.NODE_ENV === 'production' ? './app.ico' : '../public/app.ico'),
		title: '快速生成vue.electron框架',
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: true
		}
	});
	// 自定义顶部菜单
	customMenu();

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// 如果是开发模式则加载开发服务器的地址
		win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		// 打开开发调试工具
		globalShortcut.register('CTRL+SHIFT+I', () => {
			if (!process.env.IS_TEST) win.webContents.openDevTools();
		});
	} else {
		createProtocol('app');
		// 生产模式时加载 index.html
		win.loadURL('app://./index.html');
	}
	// 关闭窗口
	win.on('closed', () => {
		win = null;
	});
	// 最小化窗口
	win.on('minimize', event => {
		event.preventDefault();
		customTrayMenu(win);
	});

	// 主页面一旦加载完成后就开始执行检查更新
	win.webContents.on('did-finish-load', () => {
		autoUpdate = checkVersion(win);
	});
}

// 当所有窗口关闭时则退出应用
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		autoUpdate.quitAndInstall();
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
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
	createWindow();
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
