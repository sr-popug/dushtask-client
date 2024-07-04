import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useEffect, useRef } from 'react'
import modals from '../../../../store/modals.js'

export default function ChangeTask({ visibleFn, taskID }) {
	const color = useRef('')
	const title = useRef(null)
	const description = useRef(null)
	const type = useRef(null)
	const colors = document.querySelectorAll('.color')
	useEffect(() => {
		axios
			.get(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/one/${taskID}`
			)
			.then(res => {
				title.current.value = res.data.title
				description.current.value = res.data.description
				type.current.value = res.data.type
			})
	}, [taskID])
	const submit = e => {
		e.preventDefault()
		console.log(color)
		axios
			.patch(
				`${
					import.meta.env.VITE_REACT_API_SERVER_URL
				}/api/tasks/change/${taskID}`,
				{
					title: title.current.value,
					description: description.current.value,
					type: type.current.value,
					color: color.current,
				}
			)
			.then(() => {
				visibleFn(false)
				modals.setMiniModal('✔️Задача успешно изменена!')
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
			<h3>Change Task</h3>
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
						<label htmlFor='type'>Тип задачи</label>
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
				{/* выбор цвета среди пяти, как на сайте с кроссовками */}

				<button type='submit'> Изменить задачу</button>
			</form>
		</>
	)
}
ChangeTask.propTypes = {
	visibleFn: PropTypes.function,
	taskID: PropTypes.Number,
}
