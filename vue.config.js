/* 
    备注：
    
    准备windows和macOS两版图标。
    windows: app.ico 最小尺寸：256x256
    macOS: app.png或app.icns 最小尺寸：512x512
*/
module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				appId: 'com.huhulove.app',
				productName: 'electron.vue.layout', // 项目名，也是生成的安装文件名
				copyright: 'Copyright © 2020', // 版权信息
				directories: {
					output: './dist_electron' // 输出文件路径
				},
				win: {
					// win相关配置
					icon: './public/app.ico', // 图标，当前图标在根目录下，注意这里有两个坑
					target: [
						{
							target: 'nsis', // 利用nsis制作安装程序
							arch: [
								'x64', // 64位
								'ia32' // 32位
							]
						}
					]
				},
				mac: {
					icon: './public/app.png'
				},
				nsis: {
					oneClick: false, // 是否一键安装
					allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
					allowToChangeInstallationDirectory: true, // 允许修改安装目录
					installerIcon: './public/app.ico', // 安装图标
					uninstallerIcon: './public/app.ico', // 卸载图标
					installerHeaderIcon: './public/app.ico', // 安装时头部图标
					createDesktopShortcut: true, // 创建桌面图标
					createStartMenuShortcut: true, // 创建开始菜单图标
					shortcutName: 'electron.vue.layout' // 图标名称
					// installerSidebar: './public/app.bmp', // 安装包安装侧边图片，默认build/installerSidebar.bmp，要求164 × 314 像素
					// uninstallerSidebar: './build/sidebar.bmp' // 安装包卸载侧边图片，默认build/installerSidebar.bmp，要求164 × 314 像素
				},
				releaseInfo: {
					releaseNotes: '优化框架代码'
				},
				publish: [
					{
						provider: 'huhulove',
						url: 'http://127.0.0.1:8080/download/', // 推送的地址
						channel: 'latest' // 检查更新的渠道
					}
				]
			}
		}
	}
};
