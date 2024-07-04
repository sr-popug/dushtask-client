import axios from 'axios'
import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import user from '../../../store/user'
import homeImg from './images/home.svg'
import './styles/login.less'

export default function Login() {
	const email = useRef(null)
	const password = useRef(null)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	function submit(e) {
		e.preventDefault()
		if (email.current.value < 8 || password.current.value < 8) {
			return setError('Введенные данные не верны')
		}
		setError('')
		axios
			.post(`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/users/login`, {
				email: email.current.value,
				password: password.current.value,
			})
			.then(res => {
				setError('')
				user.setUser({})
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
				return setError(e.message)
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
				<h3>Авторизация</h3>

				<label htmlFor='email'>Email</label>
				<input ref={email} type='text' placeholder='Email' id='email' />

				<label htmlFor='password'>Пароль</label>
				<input
					ref={password}
					type='password'
					placeholder='Пароль'
					id='password'
				/>
				<button>Войти!</button>
				<div className='error'>{error}</div>
				<div className='reg-auth-not'>
					<p>
						{' '}
						Ещё нет аккаунта?{' '}
						<NavLink to='/registration'>Зарегистрироваться!</NavLink>
					</p>
				</div>
			</form>
		</div>
	)
}
