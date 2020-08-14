/*
 * @Author: huhulove
 * @Date: 2020-08-14 10:35:38
 * @Email: 2373838484@qq.com
 * @Description: 隐藏主窗口，并创建托盘，绑定关闭事件
 */
import { app, Tray, Menu } from 'electron';
import path from 'path';

const customTrayMenu = mainWin => {
	// 系统托盘右键菜单
	const menuList = [
		{
			label: '退出',
			click() {
				app.quit();
			}
		}
	];

	const iconPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? './app.png' : '../public/app.png');
	const appTray = new Tray(iconPath);
	// 图标的上下文菜单
	const contextMenu = Menu.buildFromTemplate(menuList);
	// 隐藏主窗口
	mainWin.hide();
	// 设置托盘悬浮提示
	appTray.setToolTip('never forget');
	// 设置托盘菜单
	appTray.setContextMenu(contextMenu);
	// 单击托盘小图标显示应用
	appTray.on('click', () => {
		// 显示主程序
		mainWin.show();
		// 关闭托盘显示
		appTray.destroy();
	});
};

export default customTrayMenu;
