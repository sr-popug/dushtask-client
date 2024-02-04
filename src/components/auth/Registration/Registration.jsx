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
			return setError('The entered data is not correct!')
		}
		if (password.current.value !== r_password.current.value) {
			return setError('You repeated the password incorrectly!')
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
				<h3>Sign up Here</h3>
				<div className='change-photo upload-photo'>
					{fileState && (
						<div className='preview'>
							<img src={previewSrc} id='file-ip-1-preview' />
						</div>
					)}
					{!fileState && <div className='not-photo'>Prewiew of photo</div>}

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
						<span className='input-file-btn'>Choose image</span>
					</label>
				</div>
				<label htmlFor='email'>Email</label>
				<input
					ref={email}
					type='text'
					placeholder='Email (min 8 char)'
					id='email'
				/>

				<label htmlFor='username'>Username</label>
				<input
					ref={username}
					type='text'
					placeholder='Username (min 5 char)'
					id='username'
				/>

				<div className='password'>
					<div className='pass'>
						<label htmlFor='password'>Password</label>
						<input
							ref={password}
							type='password'
							placeholder='Password (min 8 char)'
							id='password'
						/>
					</div>

					<div className='pass'>
						<label htmlFor='repeat-password'>Repeat password</label>
						<input
							ref={r_password}
							type='password'
							placeholder='Repeat Password'
							id='repeat-password'
						/>
					</div>
				</div>

				<button type='submit'>Sign Up!</button>
				<div className='error'>{error}</div>
				<div className='reg-auth-not'>
					<p>
						{' '}
						You already have account? <NavLink to='/login'>Login!</NavLink>
					</p>
				</div>
			</form>
		</div>
	)
}
