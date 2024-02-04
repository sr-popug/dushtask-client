import { makeAutoObservable } from 'mobx'
class userStore {
	user = {
		// email: 'antonpower21012008@gmail.com',
		// name: 'Anton Tsukanov',
		// password: 'Yan21-1023',
		// roles: ['USER', 'ADMIN'],
		// img: '12304532.png',
		// projects: ['1', '2'],
	}
	constructor() {
		makeAutoObservable(this)
	}

	setUser(user) {
		return (this.user = user)
	}
	deleteUser() {
		return (this.user = {})
	}
	getUser() {
		return this.user
	}
	patchUser() {}
}

export default new userStore()
