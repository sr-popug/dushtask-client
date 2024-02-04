import { observer } from 'mobx-react'
import projects from '../../../../../store/projects'

import { NavLink } from 'react-router-dom'
import Project from './Project/Project'
import './styles/projects.css'

const ProjectsList = observer(() => {
	const proj = projects.getProjects()
	const newProj = proj.filter((_, i) => i < 4)

	return (
		<article className='projects_list'>
			<h3>Projects</h3>
			<div className='projects_list_list'>
				<ul>
					{newProj.map(project => (
						<Project key={project.id} project={project} />
					))}
				</ul>
				{proj.length >= 5 ? (
					<NavLink className='show_all' to={'/'}>
						Show all {'->'}
					</NavLink>
				) : (
					''
				)}
			</div>
		</article>
	)
})
export default ProjectsList
