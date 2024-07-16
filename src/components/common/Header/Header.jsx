'use client'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import projects from '../../../store/projects'
import dushIcon from './images/dush.svg'
import infoIcon from './images/info.svg'
import logoIcon from './images/logo.png'
import profileIcon from './images/profile.svg'
import projectIcon from './images/project.svg'
import './styles/header.less'

const Header = observer(() => {
	const proj = projects.getProjects()

	return (
		<header className='aside'>
			<div className='logo'>
				<img src={logoIcon} alt='' />
			</div>
			<nav>
				<NavLink to='/'>
					<img src={dushIcon} alt='dush' />
					<p>Главная</p>
				</NavLink>
				<NavLink to={`/project/${proj[0]?.id}/tasks`}>
					<img src={projectIcon} alt='project' />
					<p>Проект</p>
				</NavLink>
				{/* <NavLink to='/time'>
					<img src={timeIcon} alt='time' />
					<p>Время</p>
				</NavLink>

				<NavLink to='/rating'>
					<img src={rateIcon} alt='rate' />
					<p>Рейтинг</p>
				</NavLink>
				<NavLink to='/message'>
					<img src={messageIcon} alt='message' />
					<p>Сообщения</p>
				</NavLink> */}
				<NavLink to='/info'>
					<img src={infoIcon} alt='info' />
					<p>Инфо</p>
				</NavLink>
				<NavLink to='/profile'>
					<img src={profileIcon} alt='info' />
					<p>Инфо</p>
				</NavLink>
			</nav>
		</header>
	)
})
export default Header
