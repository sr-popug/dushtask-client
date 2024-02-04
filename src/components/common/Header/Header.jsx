'use client'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import projects from '../../../store/projects'
import dataIcon from './images/data.svg'
import dushIcon from './images/dush.svg'
import infoIcon from './images/info.svg'
import logoIcon from './images/logo.png'
import messageIcon from './images/message.svg'
import projectIcon from './images/project.svg'
import rateIcon from './images/rate.svg'
import timeIcon from './images/time.svg'
import './styles/header.css'

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
					<p>Home</p>
				</NavLink>
				<NavLink to={`/project/${proj[0]?.id}/tasks`}>
					<img src={projectIcon} alt='project' />
					<p>Project</p>
				</NavLink>
				<NavLink to='/time'>
					<img src={timeIcon} alt='time' />
					<p>Time</p>
				</NavLink>
				<NavLink to='/date'>
					<img src={dataIcon} alt='data' />
					<p>Date</p>
				</NavLink>
				<NavLink to='/rating'>
					<img src={rateIcon} alt='rate' />
					<p>Rating</p>
				</NavLink>
				<NavLink to='/message'>
					<img src={messageIcon} alt='message' />
					<p>Message</p>
				</NavLink>
				<NavLink to='/info'>
					<img src={infoIcon} alt='info' />
					<p>Info</p>
				</NavLink>
			</nav>
		</header>
	)
})
export default Header
