import axios from 'axios'
import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import modals from '../../../store/modals'
import user from '../../../store/user'
import homeImg from './images/home.svg'
export default function CreateProject() {
	const pin = useRef(null)
	const title = useRef(null)
	const description = useRef(null)
	const navigate = useNavigate()
	function submit(e) {
		e.preventDefault()

		if (title.current.value.trim() < 3) {
			return modals.setMiniModal('❌Минимальная длинна заголовка 4 символа')
		}
		axios
			.post(`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects`, {
				title: title.current.value,
				description: description.current.value,
				img: pin.current.value,
				userId: user.getUser().id,
			})
			.then(() => {
				navigate('/')
				location.reload()
			})
	}
	return (
		<div className='auth'>
			<div className='background-auth'>
				<div className='shape'></div>
				<div className='shape'></div>
				<div className='shape'></div>
				<div className='shape'></div>
				<div className='shape'></div>
				<div className='shape'></div>
				<div className='shape'></div>
			</div>
			<NavLink to='/'>
				<img src={homeImg} alt='' />
			</NavLink>
			<form onSubmit={submit} className='auth'>
				<h3>Создать проект</h3>
				<div className='flex'>
					<div className='elem'>
						<label>Иконка</label>
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
				<label>Описание</label>
				<textarea
					ref={description}
					placeholder='Описание'
					rows='7'
					cols='42'
					id='description'
				></textarea>
				<button type='submit'>Добавить проект!</button>
			</form>
		</div>
	)
}
