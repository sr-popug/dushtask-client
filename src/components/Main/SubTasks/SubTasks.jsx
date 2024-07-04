import axios from 'axios'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import modals from '../../../store/modals'

import './styles/subtasks.less'
import Subtask from './Subtask/Subtask'
export default function SubTasks() {
	const title = useRef(null)
	const description = useRef(null)
	const params = useParams()
	const [subtasks, setSubtasks] = useState([])
	const [add, setAdd] = useState(false)
	const [buttonContent, setButtonContent] = useState('+')

	const [task, setTask] = useState('+')

	axios
		.get(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/subtasks/bytaskId/${
				params.taskId
			}`
		)
		.then(res => {
			setSubtasks(res.data)
		})
	axios
		.get(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/one/${
				params.taskId
			}`
		)
		.then(res => {
			setTask(res.data)
		})
	const submit = e => {
		e.preventDefault()
		if (title.current.value.trim().length < 3) {
			return modals.setMiniModal('❌Минимальная длинна заголовка 3 символа')
		}

		axios
			.post(`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/subtasks`, {
				title: title.current.value,
				description: description.current.value,
				taskId: +params.taskId,
			})
			.then(() => {
				modals.setMiniModal('✔️Подзадача успешно добавлена!')
				setAdd(false)
				axios
					.get(
						`${
							import.meta.env.VITE_REACT_API_SERVER_URL
						}/api/subtasks/bytaskId/${params.id}`
					)
					.then(res => {
						setSubtasks(res.data)
					})
			})
	}
	function addModalFn() {
		setAdd(prev => !prev)
		if (add) {
			setButtonContent('+')
		} else setButtonContent('-')
	}

	return (
		<section className='subtasks'>
			<div className='subtasks_list'>
				<div className='flex'>
					<h2>Подзадачи:</h2>
					<button className='add' onClick={addModalFn}>
						{buttonContent}
					</button>
				</div>
				{add && (
					<form onSubmit={submit} action=''>
						<div className='inputs'>
							<div className='input-block'>
								<h4>Заголовок</h4>
								<input ref={title} placeholder='Заголовок' type='text' />
							</div>
							<div className='input-block'>
								<h4>Описание</h4>
								<textarea
									cols={45}
									rows={7}
									placeholder='Описание'
									ref={description}
									type='text'
								/>
							</div>
						</div>
						<button className='add'>+ Добавить подзадачу</button>
					</form>
				)}
				{subtasks.length &&
					subtasks.map(subtask => {
						return <Subtask key={subtask.id} subtask={subtask} />
					})}
			</div>
			<div className='task-description'>
				<div className='flex'>
					<h3>{task.title}</h3>
					<span className={`type ${task.color}`}>{task.type}</span>
				</div>
				<h2>О задаче: </h2>
				<p>{task.description}</p>
			</div>
		</section>
	)
}
