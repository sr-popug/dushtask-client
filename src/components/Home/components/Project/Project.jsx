import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import modals from '../../../../store/modals'
import projects from '../../../../store/projects'
import ChangeProject from '../../../Main/common/Aside/ProjectsList/ChangeProject/ChangeProject'
import Modal from '../../../common/Modal/Modal'
import changeImg from '../../images/change.svg'
import deleteImg from '../../images/trash.svg'
export default function Project({ project }) {
	const [visible, setVisible] = useState(false)
	const [procent, setProcent] = useState(0)
	const [subTasks, setSubtasks] = useState(0)
	const [complete, setComplete] = useState('')
	const [completeSubTasks, setCompleteSubTasks] = useState(0)
	useEffect(() => {
		axios
			.get(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/byprId/${
					project.id
				}`
			)
			.then(res =>
				res.data.map(task => {
					axios
						.get(
							`${
								import.meta.env.VITE_REACT_API_SERVER_URL
							}/api/subtasks/bytaskId/${task.id}`
						)
						.then(res => {
							res.data.map(subtask => {
								setSubtasks(prev => (prev += 1))
								if (subtask.isComplete) {
									setCompleteSubTasks(prev => (prev += 1))
								}
							})
						})
				})
			)
	}, [project])
	useEffect(() => {
		if (subTasks != 0) {
			setProcent(Math.floor((completeSubTasks / subTasks) * 100))
		}
		if (subTasks === completeSubTasks && subTasks != 0) {
			setComplete('isComplete')
		}
	}, [subTasks, completeSubTasks])
	function changeFn(e) {
		e.preventDefault()
		setVisible(true)
	}
	function deleteFn(e) {
		e.preventDefault()

		axios
			.delete(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/delete/${
					project.id
				}`
			)
			.then(() => {
				modals.setMiniModal('✔️Проект успешно удален')
				projects.deleteProject(project.id)
			})
	}
	return (
		<>
			<NavLink to={`project/${project.id}/tasks`} className='project'>
				<div className='img'>{project.img}</div>
				<div className='text-content'>
					<h4>{project.title}</h4>
					<p>{project.description}</p>
				</div>
				<div className='bottom'>
					<div className={`complete ${complete}`}>{procent}%</div>
					<div className='buttons'>
						<button onClick={changeFn}>
							<img src={changeImg} alt='' />
						</button>
						<button onClick={deleteFn}>
							<img src={deleteImg} alt='' />
						</button>
					</div>
				</div>
			</NavLink>
			{visible && (
				<Modal visibleFn={setVisible}>
					<ChangeProject project={project} visibleFn={setVisible} />
				</Modal>
			)}
		</>
	)
}
Project.propTypes = {
	project: PropTypes.objectOrObservableObject,
}
