import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../../common/Modal/Modal'
import ModalCreateTask from '../CreateTask/ModalCreateTask'
// import commentsImg from './images/comments.svg'

// import tasksImg from './images/tasks.svg'
import Task from './Task/Task'
import './styles/tasks.css'

// массив сортируется, те, которые законченны в конец, те кто нет в начало
export default function Tasks() {
	const [visible, setVisible] = useState(false)
	const [tasks, setTasks] = useState([])
	const params = useParams()

	axios
		.get(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/byprId/${
				params.id
			}`
		)
		.then(res => {
			setTasks(res.data)
		})

	return (
		<section className='tasks'>
			<button className='add' onClick={() => setVisible(true)}>
				+ Add New Task
			</button>
			<div className='tasks_list'>
				{tasks.length &&
					tasks.map(task => {
						return <Task key={task.id} task={task} />
					})}
			</div>
			{visible && (
				<div className='add_task_modal'>
					<Modal visibleFn={setVisible}>
						<ModalCreateTask visibleFn={setVisible} />
					</Modal>
				</div>
			)}
		</section>
	)
}
