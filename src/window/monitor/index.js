import { ipcMain, app } from 'electron';
import createMainWindow from '../main/main.window';

const monitor = winLogin => new Promise(resolve => {
	// 监听打开主窗口
	ipcMain.on('openMainWindow', () => {
		winLogin.close();
		resolve({
			event: 'openMainWindow',
			data: createMainWindow()
		});
	});
	// 监听最小化窗口
	ipcMain.on('minLoginWindow', () => {
		winLogin.minimize();
		resolve();
	});
	// 监听关闭窗口
	ipcMain.on('maxLoginWindow', () => {
		app.quit();
		resolve();
	});
});

export default monitor;
