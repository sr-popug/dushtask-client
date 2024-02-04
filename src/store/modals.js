import { makeAutoObservable } from 'mobx'
class modalsStore {
	miniModal = ''
	constructor() {
		makeAutoObservable(this)
	}

	setDisableAllModal() {
		this.addTaskModal = false
		this.changeSubTaskModal = false
		this.changeUserModal = false
	}

	setMiniModal(text) {
		this.miniModal = text
		document.querySelector('.mini-modal').classList.add('active')
		setTimeout(() => {
			document.querySelector('.mini-modal').classList.remove('active')
		}, 5000)
	}
}

export default new modalsStore()
