import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/progress.css'

export default function Progress() {
	const params = useParams()
	const [proj, setProj] = useState({})
	const [completeSubTasks, setCompleteSubTasks] = useState(0)
	const [procent, setProcent] = useState(0)
	const [subTasks, setSubtasks] = useState(0)
	useEffect(() => {
		setCompleteSubTasks(0)
		setSubtasks(0)
		if (params.id) {
			axios
				.get(
					`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/one/${
						params.id
					}`
				)
				.then(res => {
					setProj(res.data)
					axios
						.get(
							`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/byprId/${
								res.data.id
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
				})
		}
	}, [params])
	useEffect(() => {
		if (subTasks != 0) {
			setProcent(Math.floor((completeSubTasks / subTasks) * 100))
		} else {
			setProcent(0)
		}
	}, [subTasks, completeSubTasks])
	return (
		<div className='progress'>
			<div className='project-emoji'>{proj.img}</div>
			<div className='code'>
				<h3>{proj.title}</h3>
				<div className='progress_bar'>
					<progress value={procent} max='100'></progress>
					<p>{procent}% complete</p>
				</div>
			</div>
		</div>
	)
}
