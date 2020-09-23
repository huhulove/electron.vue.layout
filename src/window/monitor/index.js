import { ipcMain, app } from 'electron';
import createMainWindow from '../main/main.window';
import store from '../../plugins/data';

const monitor = winLogin => {
	return new Promise(resolve => {
		// 监听打开主窗口
		ipcMain.on('openMainWindow', () => {
			setTimeout(() => {
				winLogin.close();
			});
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
		// 监听存储数据
		ipcMain.on('setStore', (event, { key, value }) => {
			store.set(key, value);
		});
	});
};

export default monitor;
