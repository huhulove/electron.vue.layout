import { BrowserWindow, globalShortcut } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import path from 'path';
import customMenu from './menu.main';
import customTrayMenu from './menu.tray';
import checkVersion from './APPAutoUpdater';

const createMainWindow = () => {
	let autoUpdate;
	let isInstall;

	// 创建浏览器窗口
	let winMain = new BrowserWindow({
		width: 1200,
		height: 900,
		icon: path.join(__dirname, process.env.NODE_ENV === 'production' ? './app.ico' : '../public/app.ico'),
		title: '快速生成vue.electron框架',
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: true
		}
	});
	// 自定义顶部菜单
	customMenu(winMain);

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// 如果是开发模式则加载开发服务器的地址
		const homeUrl = `${process.env.WEBPACK_DEV_SERVER_URL}#/home`;
		winMain.loadURL(homeUrl);
		// 打开开发调试工具
		globalShortcut.register('F12', () => {
			if (!process.env.IS_TEST) winMain.webContents.openDevTools();
		});
	} else {
		createProtocol('app');
		// 生产模式时加载 index.html
		winMain.loadURL('app://./index.html');
	}
	// 关闭窗口
	winMain.on('closed', () => {
		winMain = null;
	});
	// 最小化窗口
	winMain.on('minimize', event => {
		event.preventDefault();
		customTrayMenu(winMain);
	});

	// 主页面一旦加载完成后就开始执行检查更新
	winMain.webContents.on('did-finish-load', () => {
		const r = checkVersion(winMain);
		autoUpdate = r.autoUpdater;
		isInstall = r.isInstall;
	});
	return {
		winMain,
		autoUpdate,
		isInstall
	};
};

export default createMainWindow;
