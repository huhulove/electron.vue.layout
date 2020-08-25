import { Notification } from 'element-ui';

const updateMixin = {
	data() {
		return {
			progress: 0,
			status: null,
			message: null
		};
	},
	watch: {
		status() {
			// 检测到新版本，下载新版本
			if (this.status === 2) {
				const msg = this.message;
				this.hnotify(msg);
			}
			// 下载完成提示用户是否立即更新
			if (this.status === 4) {
				const msg = this.message;
				this.hnotifyHTML(msg);
			}
		}
	},
	mounted() {
		this.$ipcRenderer.on('message', (event, messageObj) => {
			this.status = messageObj.status;
			this.message = messageObj.message;
		});
		this.$ipcRenderer.on('downloadProgress', (event, progressObj) => {
			this.progress = progressObj.percent || 0;
		});
		this.$ipcRenderer.on('noInstall', (event, messageObj) => {
			this.hnotify(messageObj);
		});
	},
	methods: {
		hnotify(message) {
			Notification.closeAll();
			this.$notify({
				title: '',
				message: message,
				dangerouslyUseHTMLString: true,
				position: 'bottom-right',
				duration: 0
			});
		},
		hnotifyHTML(message) {
			const h = this.$createElement;
			Notification.closeAll();
			this.$notify({
				title: '',
				message: h('div', null, [
					message,
					h('br'),
					h(
						'div',
						{
							style: 'margin-top: 10px'
						},
						[
							h(
								'el-button',
								{
									attrs: {
										type: 'primary',
										size: 'mini'
									},
									on: {
										click: this.updateNow
									}
								},
								'立即更新'
							),
							h(
								'el-button',
								{
									attrs: {
										type: 'primary',
										size: 'mini'
									},
									on: {
										click: this.updateWait
									}
								},
								'以后'
							)
						]
					)
				]),
				dangerouslyUseHTMLString: true,
				position: 'bottom-right',
				duration: 0
			});
		},
		updateNow() {
			this.$ipcRenderer.send('updateNow');
		},
		updateWait() {
			Notification.closeAll();
		}
	}
};

export default updateMixin;
