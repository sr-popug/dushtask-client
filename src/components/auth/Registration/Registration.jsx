import axios from 'axios'
import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import user from '../../../store/user'
import homeImg from '../Login/images/home.svg'
export default function Registration() {
	const [error, setError] = useState('')
	const [fileState, setFileState] = useState(false)
	const [previewSrc, setPreviewSrc] = useState(false)
	const file = useRef(null)
	const username = useRef(null)
	const email = useRef(null)
	const password = useRef(null)
	const r_password = useRef(null)
	const navigate = useNavigate()
	function showPreview(event) {
		if (event.target.files.length > 0) {
			setFileState(true)
			var src = URL.createObjectURL(event.target.files[0])

			setPreviewSrc(src)
		} else {
			src = ''
			setPreviewSrc('')
		}
	}
	function submit(e) {
		e.preventDefault()
		if (
			email.current.value.trim().length < 8 ||
			password.current.value.trim().length < 8 ||
			username.current.value.trim().length < 5 ||
			!file.current.files[0]
		) {
			return setError('Введенные данные не верны!')
		}
		if (password.current.value !== r_password.current.value) {
			return setError('Пароль повторен не верно!')
		}
		setError('')
		var formData = new FormData()
		formData.append('img', file.current.files[0])
		formData.append('email', email.current.value)
		formData.append('name', username.current.value)
		formData.append('password', password.current.value)
		axios
			.post(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/users/register`,
				formData
			)
			.then(res => {
				user.setUser({
					email: res.data.email,
					password: res.data.email,
					name: res.data.name,
					roles: res.data.roles,
					img: res.data.img,
					id: res.data.id,
				})
				localStorage.setItem(
					'user',
					`{"email": "${res.data.email}","password": "${res.data.password}"}`
				)
				navigate('/')
				location.reload()
			})
			.catch(e => {
				setError(JSON.stringify(e.message))
			})
	}
	return (
		<div className='auth register'>
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
				<h3>Регистрация</h3>
				<div className='change-photo upload-photo'>
					{fileState && (
						<div className='preview'>
							<img src={previewSrc} id='file-ip-1-preview' />
						</div>
					)}
					{!fileState && <div className='not-photo'>Превью фото</div>}

					<label className='input-file'>
						<input
							name='file'
							accept='image/png'
							className='input-file'
							onChange={showPreview}
							ref={file}
							type='file'
							placeholder='Password'
							id='password'
						/>
						<span className='input-file-btn'>Выбрать картинку</span>
					</label>
				</div>
				<label htmlFor='email'>Email</label>
				<input
					ref={email}
					type='text'
					placeholder='Email (минимум 8 символов)'
					id='email'
				/>

				<label htmlFor='username'>Имя пользователя</label>
				<input
					ref={username}
					type='text'
					placeholder='Имя пользователя (минимум 5 символов)'
					id='username'
				/>

				<div className='password'>
					<div className='pass'>
						<label htmlFor='password'>Пароль</label>
						<input
							ref={password}
							type='password'
							placeholder='Пароль (минимум 8 символов)'
							id='password'
						/>
					</div>

					<div className='pass'>
						<label htmlFor='repeat-password'>Повторите пароль</label>
						<input
							ref={r_password}
							type='password'
							placeholder='Повторите пароль'
							id='repeat-password'
						/>
					</div>
				</div>

				<button type='submit'>Зарегистрироваться!</button>
				<div className='error'>{error}</div>
				<div className='reg-auth-not'>
					<p>
						{' '}
						Уже есть аккаунт? <NavLink to='/login'>Войти!</NavLink>
					</p>
				</div>
			</form>
		</div>
	)
}
