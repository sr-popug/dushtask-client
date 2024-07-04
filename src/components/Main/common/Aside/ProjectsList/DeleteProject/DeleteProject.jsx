import axios from 'axios'
import { PropTypes } from 'mobx-react'
import modals from '../../../../../../store/modals'
import projects from '../../../../../../store/projects'
export default function DeleteProject({ visibleFn, project }) {
	function submit(e) {
		e.preventDefault()
		axios
			.delete(`http://localhost:3001/api/projects/delete/${project.id}`)
			.then(() => {
				modals.setMiniModal('✔️Проект успешно удален')
				projects.deleteProject(project.id)
				visibleFn(false)
			})
	}
	function no() {
		visibleFn(false)
	}
	return (
		<form onSubmit={submit} className='auth change-project'>
			<h3>Вы уверены, что хотите удалить проект?</h3>

			<button onClick={submit} type='submit'>
				Да!
			</button>
			<button onClick={no} type='submit'>
				Нет!
			</button>
		</form>
	)
}
DeleteProject.propTypes = {
	project: PropTypes.Number,
	visibleFn: PropTypes.Function,
}
