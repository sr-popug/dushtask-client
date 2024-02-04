import { observer } from 'mobx-react'
import userStore from '../../../store/user'
import searchImg from './images/search.svg'
import settingImg from './images/settings.svg'
import './styles/topHead.css'
const TopHeader = observer(() => {
	let user = userStore.getUser()

	console.log(user)
	return (
		<header className='top-head'>
			<form className='input-search'>
				<button>
					<img src={searchImg} alt='' />
				</button>
				<input type='text' placeholder='Search...' />
			</form>
			{user.name && (
				<div className='right '>
					<a className='settings' href='/profile'>
						<img width={10} src={settingImg} alt='settings' />
					</a>
					<a href='/profile'>
						<img
							width={40}
							src={`${import.meta.env.VITE_REACT_API_SERVER_URL}/${user.img}`}
							alt='profile'
						/>
						<p className='name'>{user.name}</p>
					</a>
				</div>
			)}
			{!user.name && (
				<div className='right register'>
					<a href='/registration'>Registration</a>
					<a href='/login'>Login</a>
				</div>
			)}
		</header>
	)
})
export default TopHeader
