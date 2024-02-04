import { NavLink, useParams } from 'react-router-dom'
import './styles/navbar.css'

export default function Navbar() {
	const params = useParams()
	return (
		<nav className='top'>
			<ul>
				<li>
					<NavLink to={`/project/${params.id}/overview`}>Overview</NavLink>
				</li>
				<li>
					<NavLink to={`/project/${params.id}/tasks`}>Tasks</NavLink>
				</li>
				<li>
					<NavLink to={`/project/${params.id}/notes`}>Notes</NavLink>
				</li>
			</ul>
		</nav>
	)
}
