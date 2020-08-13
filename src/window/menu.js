import { Menu } from 'electron';

const customMenu = () => {
	const menuList = [
		{
			label: '文件',
			submenu: [
				{
					// 添加快捷键
					accelerator: 'alt+n',
					// 子标题
					label: '新建文件',
					// 子标题类型 type String
					// normal - 正常  separator - 分隔符  submenu - 子菜单  checkbox - 复选框  radio - 单选框
					type: 'normal',         
					// 点击事件
					click() {
						// alert('ctrl');
					}
				}
			]
		},
		{
			label: '帮助',
			submenu: [
				{
					label: '关于',
					type: 'normal',
					click() {
						// alert('ctrl');
					}
				}
			]
		}
	];

	const menu = Menu.buildFromTemplate(menuList); // 如果 menu= null; window 隐藏顶部菜单;  mac 开发时不会隐藏，打包之后会隐藏顶部菜单
	Menu.setApplicationMenu(menu);
};
export default customMenu;
