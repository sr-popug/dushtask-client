import { observer } from 'mobx-react-lite'
import projectsStore from '../../store/projects.js'

import { NavLink } from 'react-router-dom'
import user from '../../store/user.js'
import Project from './components/Project/Project.jsx'
import './styles/home.less'
const Home = observer(() => {
	let projs = projectsStore.getProjects()
	const login = user.getUser().id
	return (
		<section className='home'>
			{login && (
				<>
					<h2>Проекты!</h2>
					<h3 className='subtitle'>ВАШИ проекты:</h3>
					<article className='projects'>
						{projs.length &&
							projs.map(proj => {
								return <Project key={proj.id} project={proj} />
							})}
					</article>
				</>
			)}
			{!login && (
				<>
					<p>
						To see your projects,{' '}
						<NavLink to={'registration'}>Register</NavLink> or{' '}
						<NavLink to={'login'}> Login</NavLink>
					</p>
				</>
			)}
		</section>
	)
})
export default Home
