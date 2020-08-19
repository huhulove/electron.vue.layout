import { Notification } from 'element-ui';

const { ipcRenderer } = window.require('electron');
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
		const that = this;
		ipcRenderer.on('message', (event, messageObj) => {
			that.status = messageObj.status;
			that.message = messageObj.message;
		});
		ipcRenderer.on('downloadProgress', (event, progressObj) => {
			that.progress = progressObj.percent || 0;
		});
	},
	methods: {
		showUpdater() {
			ipcRenderer.send('checkForUpdate');
		},
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
			ipcRenderer.send('updateNow');
		},
		updateWait() {
			Notification.closeAll();
		}
	}
};

export default updateMixin;
