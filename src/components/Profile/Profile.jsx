import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import userStore from '../../store/user'
import Modal from '../common/Modal/Modal'
import ChangeImg from './ChangeImg/ChangeImg'
import ChangeUser from './ChangeUser/ChangeUserModal'
import changeImg from './images/change.svg'
import './styles/profile.css'
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
			return setError('The minimum length is 5 char')
		}
		if (name == 'email' && value.trim().length < 10) {
			return setError('Value is not email')
		}
		if (name == 'password' && value.trim().length < 8) {
			return setError('The minimum length is 8 char')
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
			<h2>Profile Info</h2>
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
								<h3>Name:</h3>
								<p>{user.name}</p>
							</div>
							<button onClick={changeNameOpen} className='change'>
								<img src={changeImg} alt='change' />
							</button>
							{inputName && (
								<div className='change'>
									<input ref={nameInput} type='text' placeholder='New Name' />
									<button
										onClick={() => submit('name', nameInput.current.value)}
										type='submit'
									>
										Submit!
									</button>
								</div>
							)}
						</div>
						<div className='about'>
							<div className='section'>
								<h3>Mail:</h3>
								<p>{user.email}</p>
							</div>
							<button onClick={changeMailOpen} className='change'>
								<img src={changeImg} alt='change' />
							</button>
							{inputMail && (
								<div className='change'>
									<input ref={mailInput} type='text' placeholder='New Mail' />
									<button
										onClick={() => submit('email', mailInput.current.value)}
										type='submit'
									>
										Submit!
									</button>
								</div>
							)}
						</div>
						<div className='about'>
							<div className='section'>
								<h3>Password:</h3>
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
										placeholder='New Password'
									/>
									<button
										onClick={() => submit('password', passInput.current.value)}
										type='submit'
									>
										Submit!
									</button>
								</div>
							)}
						</div>
						<div className='buttons'>
							<p className='error'>{error}</p>
							<button onClick={logOut} className='out'>
								Log out
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
