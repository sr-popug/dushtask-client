import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useEffect, useRef } from 'react'
import modals from '../../../../../../store/modals'

export default function ChangeProject({ project }) {
	const pin = useRef(null)
	const title = useRef(null)
	const description = useRef(null)
	useEffect(() => {
		title.current.value = project.title
		description.current.value = project.description
		pin.current.value = project.img
	}, [])
	function submit(e) {
		e.preventDefault()
		if (title.current.value.trim() < 3) {
			return modals.setMiniModal('❌Минимальная длинна заголовка 4 символа')
		}

		axios
			.patch(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/change/${
					project.id
				}`,
				{
					title: title.current.value,
					description: description.current.value,
					img: pin.current.value,
				}
			)
			.then(() => {
				location.reload()
			})
	}
	return (
		<form onSubmit={submit} className='auth change-project'>
			<h3>Изменить проект</h3>
			<div className='flex'>
				<div className='elem'>
					<label>Смайл</label>
					<select ref={pin}>
						<option value='🏡'>🏡</option>
						<option value='🤪'>🤪</option>
						<option value='📱'>📱</option>
						<option value='🏢'>🏢</option>
						<option value='💵'>💵</option>
					</select>
				</div>
				<div className='elem'>
					<label>Заголовок</label>
					<input ref={title} placeholder='Заголовок' type='text' id='title' />
				</div>
			</div>
			<label> Описание</label>
			<textarea
				ref={description}
				placeholder='Описание'
				rows='7'
				cols='42'
				id='description'
			></textarea>
			<button type='submit'>Изменить проект!</button>
		</form>
	)
}
ChangeProject.propTypes = {
	project: PropTypes.Number,
}
