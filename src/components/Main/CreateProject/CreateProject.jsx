import axios from 'axios'
import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import user from '../../../store/user'
import homeImg from './images/home.svg'
export default function CreateProject() {
	const pin = useRef(null)
	const title = useRef(null)
	const description = useRef(null)
	const navigate = useNavigate()
	function submit(e) {
		e.preventDefault()
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
				<h3>Create Project</h3>
				<div className='flex'>
					<div className='elem'>
						<label>Pin</label>
						<select ref={pin}>
							<option value='🏡'>🏡</option>
							<option value='🤪'>🤪</option>
							<option value='📱'>📱</option>
							<option value='🏢'>🏢</option>
							<option value='💵'>💵</option>
						</select>
					</div>
					<div className='elem'>
						<label>Title</label>
						<input ref={title} placeholder='Title' type='text' id='title' />
					</div>
				</div>
				<label>Description</label>
				<textarea
					ref={description}
					placeholder='Description'
					rows='7'
					cols='42'
					id='description'
				></textarea>
				<button type='submit'>Add Project!</button>
			</form>
		</div>
	)
}
