import { makeAutoObservable } from 'mobx'
class projectsStore {
	projects = []
	constructor() {
		makeAutoObservable(this)
	}

	setProjects(projects) {
		return (this.projects = projects)
	}

	deleteProject(id) {
		this.setProjects(
			this.projects.filter(project => {
				return project.id != id
			})
		)
	}
	getProjects() {
		return this.projects
	}
	patchProjects() {}
}

export default new projectsStore()
