import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import modals from '../../../store/modals'
import './styles/modalCreateTask.less'
export default function ModalCreateTask({ visibleFn }) {
	const color = useRef('')
	const title = useRef(null)
	const description = useRef(null)
	const type = useRef(null)
	const params = useParams()
	const colors = document.querySelectorAll('.color')

	const submit = e => {
		e.preventDefault()
		console.log(color)
		axios
			.post(`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/`, {
				title: title.current.value,
				description: description.current.value,
				type: type.current.value,
				color: color.current,
				projectId: Number(params.id),
			})
			.then(() => {
				visibleFn(false)
				modals.setMiniModal('✔️Задача успешно добавлена')
			})
	}
	function colorFn(e) {
		color.current = e.target.className.split(' ')[1]
		for (let key of colors) {
			key.classList.remove('active')
		}

		e.target.classList.add('active')
	}
	return (
		<>
			<h3>Add New Task</h3>
			<form onSubmit={submit}>
				<label htmlFor='title'>Заголовок</label>
				<input ref={title} type='text' id='title' placeholder='Заголовок' />

				<label htmlFor='description'>Описание</label>
				<textarea
					ref={description}
					cols={40}
					rows={10}
					type='text'
					id='description'
					placeholder='Описание'
				/>

				<div className='flex'>
					<div>
						<label htmlFor='type'>Tип задачи</label>
						<input
							ref={type}
							max={15}
							type='text'
							id='type'
							placeholder='Тип'
						/>
					</div>
					<div className='choose-color'>
						<label htmlFor='type'>Цвет типа</label>

						<div className='colors'>
							<div onClick={colorFn} className='color yellow'></div>
							<div onClick={colorFn} className='color green'></div>
							<div onClick={colorFn} className='color red'></div>
							<div onClick={colorFn} className='color blue'></div>
							<div onClick={colorFn} className='color purple'></div>
						</div>
					</div>
				</div>

				<button type='submit'> + Добавить задачу!</button>
			</form>
		</>
	)
}
ModalCreateTask.propTypes = {
	visibleFn: PropTypes.function,
}
