import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import modals from '../../../../../../store/modals'
import projects from '../../../../../../store/projects'
import Modal from '../../../../../common/Modal/Modal'
import ChangeProject from '../ChangeProject/ChangeProject'
import changeImg from '../images/change.svg'
import dopIcon from '../images/dop.svg'
import trashImg from '../images/trash.svg'

export default function Project({ project }) {
	const params = useParams()
	const menuRef = useRef(null)
	const navigate = useNavigate()
	const [menu, setMenu] = useState(false)
	const [visibleChange, setVisibleChange] = useState(false)

	function dopClick(e) {
		e.preventDefault()
		setMenu(prev => !prev)
	}
	const menuFn = e => {
		e.preventDefault()
		setVisibleChange(true)
		setMenu(false)
	}
	const deleteFn = () => {
		axios
			.delete(`http://localhost:3001/api/projects/delete/${project.id}`)
			.then(() => {
				modals.setMiniModal('✔️The project has been successfully deleted')
				projects.deleteProject(project.id)
				navigate('/')
			})
	}
	return (
		<li>
			<NavLink
				className={params.id == project.id ? 'active' : ''}
				to={`/project/${project.id}/tasks`}
			>
				<div className='info'>
					<div className='image'>{project.img}</div>
					<p>{project.title}</p>
				</div>
				<div onClick={dopClick} className='dop'>
					<img src={dopIcon} alt='dop' />
				</div>
				{menu && (
					<div ref={menuRef} className='menu'>
						<table>
							<tr onClick={menuFn} className='tr'>
								<img src={changeImg} alt='settings' />
								Change
							</tr>

							<tr onClick={deleteFn}>
								<img src={trashImg} alt='settings' />
								Delete
							</tr>
						</table>
					</div>
				)}
			</NavLink>
			{visibleChange && (
				<Modal visibleFn={setVisibleChange}>
					<ChangeProject visibleFn={setVisibleChange} project={project} />
				</Modal>
			)}
		</li>
	)
}
Project.propTypes = {
	project: PropTypes.object,
}
