import { BrowserWindow, globalShortcut } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import path from 'path';

const createLoginWindow = () => {
	// 创建浏览器窗口
	const winLogin = new BrowserWindow({
		width: 440,
		height: 330,
		icon: path.join(__dirname, process.env.NODE_ENV === 'production' ? './app.ico' : '../public/app.ico'),
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// 如果是开发模式则加载开发服务器的地址
		winLogin.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		// 打开开发调试工具
		globalShortcut.register('F12', () => {
			if (!process.env.IS_TEST) win.webContents.openDevTools();
		});
	} else {
		createProtocol('app');
		// 生产模式时加载 index.html
		winLogin.loadURL('app://./index.html');
	}
	return winLogin;
};

export default createLoginWindow;
