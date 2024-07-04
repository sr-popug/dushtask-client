import { NavLink, useParams } from 'react-router-dom'
import './styles/navbar.less'

export default function Navbar() {
	const params = useParams()
	return (
		<nav className='top'>
			<ul>
				<li>
					<NavLink to={`/project/${params.id}/overview`}>Общее</NavLink>
				</li>
				<li>
					<NavLink to={`/project/${params.id}/tasks`}>Задачи</NavLink>
				</li>
				<li>
					<NavLink to={`/project/${params.id}/notes`}>Заметки</NavLink>
				</li>
			</ul>
		</nav>
	)
}
