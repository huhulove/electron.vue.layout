import { Menu } from 'electron';

const customMenu = () => {
  const menuList = [
    {
      label: '文件',
      submenu: [
        {
          // 添加快捷键
          accelerator: 'ctrl+n',
          // 子标题
          label: '新建文件',
          // 子标题类型 type String (可选)-可以是 normal、separator、submenu、checkbox 或 radio。
          type: 'normal',
          // 点击事件
          click() {
            // alert('ctrl');
          }
        },
        {
          // 添加快捷键
          accelerator: 'ctrl+n',
          // 子标题
          label: '另存为',
          // 子标题类型 type String (可选)-可以是 normal、separator、submenu、checkbox 或 radio。
          type: 'normal',
          // 点击事件
          click() {
            // alert('ctrl');
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          // 添加快捷键
          accelerator: 'ctrl+n',
          // 子标题
          label: '撤销',
          // 子标题类型 type String (可选)-可以是 normal、separator、submenu、checkbox 或 radio。
          type: 'normal',
          // 点击事件
          click() {
            // alert('ctrl');
          }
        },
        {
          // 添加快捷键
          accelerator: 'ctrl+n',
          // 子标题
          label: '恢复',
          // 子标题类型 type String (可选)-可以是 normal、separator、submenu、checkbox 或 radio。
          type: 'normal',
          // 点击事件
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
