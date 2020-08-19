import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';
/* import Store from 'electron-store';
import Log from 'electron-log';
import path from 'path'; */

// 通过主进程发送事件给渲染进程，提示更新信息
const sendUpdateMessage = (win, text) => {
	win.webContents.send('message', text);
};

const checkVersion = win => {
	const message = {
		error: {
			status: -1,
			message: '检查更新出错'
		},
		checking: {
			status: 1,
			message: '正在检查更新……'
		},
		updateAva: {
			status: 2,
			message: '检测到新版本，正在下载……'
		},
		updateNotAva: {
			status: 3,
			message: '已是最新版本，无需更新'
		},
		updateComplete: {
			status: 4,
			message: '下载完成, 请问现在是否更新? '
		}
	};
	autoUpdater.setFeedURL('http://localhost:8090/');

	// 将自动下载包设置为false，产品的需求是让用户自己点击更新下载
	// autoUpdater.autoDownload = false;
	// 监听自动更新的几个事件
	// 监听如果自动更新失败将停止安装
	autoUpdater.on('error', () => {
		sendUpdateMessage(win, message.error);
	});
	// 检查更新是否已开始时发出
	autoUpdater.on('checking-for-update', () => {
		sendUpdateMessage(win, message.checking);
	});
	// 检测有可更新的应用包
	autoUpdater.on('update-available', () => {
		sendUpdateMessage(win, message.updateAva);
	});
	// 检测没有可用更新时发出
	autoUpdater.on('update-not-available', () => {
		sendUpdateMessage(win, message.updateNotAva);
	});
	// 下载可更新的安装包
	autoUpdater.on('update-downloaded', () => {
		sendUpdateMessage(win, message.updateComplete);
	});
	// 监听下载进度
	autoUpdater.on('download-progress', progressObj => {
		win.webContents.send('downloadProgress', progressObj);
	});

	autoUpdater.checkForUpdates();
	return autoUpdater;
};

// 手动更新
ipcMain.on('checkForUpdate', () => {
	checkVersion(win);
});

// 立即更新
ipcMain.on('updateNow', () => {
	// 退出应用并安装
	autoUpdater.quitAndInstall();
});

/* return false;

global.store = new Store();
autoUpdater.logger = Log;
// 监听输出的日志
autoUpdater.logger.transports.file.level = 'info';
// 设置当前的版本号为自动更新的版本号
global.currentVersion = autoUpdater.currentVersion;

const checkVersion = () => {
	autoUpdater.updateConfigPath = path.join(__dirname, process.env.NODE_ENV != 'production' ? './dev-app-update.yml' : './app-update.yml');
	autoUpdater.checkForUpdates();
}; */

export default checkVersion;
