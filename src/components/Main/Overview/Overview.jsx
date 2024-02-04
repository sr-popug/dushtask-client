import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projects from '../../../store/projects'
import './styles/overview.css'

const Overview = observer(() => {
	const params = useParams()
	const [project, setProject] = useState({
		description: '',
		title: '',
	})
	const [subtasks, setSubtasks] = useState(0)
	const [completeSubtasks, setCompleteSubTasks] = useState(0)
	console.log(project)
	const projectss = projects.getProjects()
	useEffect(() => {
		setProject(projectss.find(el => el?.id == params.id))
	}, [])
	useEffect(() => {
		setSubtasks(0)
		setCompleteSubTasks(0)
		axios
			.get(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/byprId/${
					project?.id
				}`
			)
			.then(res => {
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
			})
	}, [params, project?.id])

	return (
		<section className='overview'>
			<h3>About</h3>
			<p className='description'>{project?.description}</p>

			<h3>
				Complete Subtasks{'  '}
				<span className='bold'> {` ${completeSubtasks} / ${subtasks}`}</span>
			</h3>
			<h3>
				Time in project <span className='bold'> {project?.time}</span>
			</h3>
		</section>
	)
})
export default Overview
