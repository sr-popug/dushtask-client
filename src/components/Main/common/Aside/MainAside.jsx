import { NavLink } from 'react-router-dom'
import ProjectsList from './ProjectsList/ProjectsList'
import Time from './Time/Time'
import './styles/mainAside.css'

export default function MainAside() {
	return (
		<aside className='main_aside'>
			<ProjectsList />
			<Time />
			<NavLink to='/create_project'>
				<button className='add_project'>+ Add Project</button>
			</NavLink>
		</aside>
	)
}
