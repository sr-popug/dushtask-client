import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import userStore from '../../store/user'
import Modal from '../common/Modal/Modal'
import ChangeImg from './ChangeImg/ChangeImg'
import ChangeUser from './ChangeUser/ChangeUserModal'
import changeImg from './images/change.svg'
import './styles/profile.less'
const Profile = observer(() => {
	let user = userStore.getUser()
	const [visible, setVisible] = useState(false)
	const [visibleImg, setVisibleImg] = useState(false)
	const [changeData, setChangeData] = useState({})

	const nameInput = useRef(null)
	const mailInput = useRef(null)
	const passInput = useRef(null)

	const [inputName, setInputName] = useState(false)
	const [inputMail, setInputMail] = useState(false)
	const [inputPassword, setInputPassword] = useState(false)
	const [error, setError] = useState('')

	const logOut = () => {
		localStorage.removeItem('user')
		location.reload()
		userStore.deleteUser()
	}

	const submit = (name, value) => {
		if (name == 'name' && value.trim().length < 5) {
			return setError('Минимальная длинна - 5 символов')
		}
		if (name == 'email' && value.trim().length < 10) {
			return setError('Введенное значение не является электронной почтой')
		}
		if (name == 'password' && value.trim().length < 8) {
			return setError('Минимальная длинна - 8 символов')
		}
		setChangeData({
			[name]: value,
		})
		setVisible(true)
	}

	function changeNameOpen() {
		setInputName(prev => !prev)
	}
	function changePassOpen() {
		setInputPassword(prev => !prev)
	}
	function changeMailOpen() {
		setInputMail(prev => !prev)
	}
	function changeImgOpen() {
		setVisibleImg(prev => !prev)
	}

	return (
		<section className='profile'>
			<h2>Информация профиля</h2>
			{user.id && (
				<article className='profile-info'>
					<div className='image'>
						<img
							src={`${import.meta.env.VITE_REACT_API_SERVER_URL}/${user.img}`}
							alt=''
						/>
						<button onClick={changeImgOpen} className='change'>
							<img src={changeImg} alt='change' />
						</button>
					</div>
					<div className='text-info'>
						<div className='about'>
							<div className='section'>
								<h3>ID:</h3>
								<p>{user.id}</p>
							</div>
						</div>
						<div className='about'>
							<div className='section'>
								<h3>Имя:</h3>
								<p>{user.name}</p>
							</div>
							<button onClick={changeNameOpen} className='change'>
								<img src={changeImg} alt='change' />
							</button>
							{inputName && (
								<div className='change'>
									<input ref={nameInput} type='text' placeholder='Новое имя' />
									<button
										onClick={() => submit('name', nameInput.current.value)}
										type='submit'
									>
										Сохранить!
									</button>
								</div>
							)}
						</div>
						<div className='about'>
							<div className='section'>
								<h3>Электронная почта: </h3>
								<p>{user.email}</p>
							</div>
							<button onClick={changeMailOpen} className='change'>
								<img src={changeImg} alt='change' />
							</button>
							{inputMail && (
								<div className='change'>
									<input
										ref={mailInput}
										type='text'
										placeholder='Новый Email'
									/>
									<button
										onClick={() => submit('email', mailInput.current.value)}
										type='submit'
									>
										Сохранить!
									</button>
								</div>
							)}
						</div>
						<div className='about'>
							<div className='section'>
								<h3>Пароль:</h3>
								<p>
									{user.password
										.split('')
										.map(el => (el = '*'))
										.join('')}
								</p>
							</div>
							<button onClick={changePassOpen} className='change'>
								<img src={changeImg} alt='change' />
							</button>
							{inputPassword && (
								<div className='change'>
									<input
										ref={passInput}
										type='text'
										placeholder='Новый пароль'
									/>
									<button
										onClick={() => submit('password', passInput.current.value)}
										type='submit'
									>
										Сохранить!
									</button>
								</div>
							)}
						</div>
						<div className='buttons'>
							<p className='error'>{error}</p>
							<button onClick={logOut} className='out'>
								Выйти
							</button>
						</div>
					</div>
				</article>
			)}
			<br />
			{visibleImg && (
				<div className='add_task_modal'>
					<Modal visibleFn={setVisibleImg}>
						<ChangeImg user={user} visibleFn={setVisibleImg} />
					</Modal>
				</div>
			)}
			{visible && (
				<div className='add_task_modal'>
					<Modal visibleFn={setVisible}>
						<ChangeUser
							changeData={changeData}
							user={user}
							visibleFn={setVisible}
						/>
					</Modal>
				</div>
			)}
		</section>
	)
})

export default Profile
