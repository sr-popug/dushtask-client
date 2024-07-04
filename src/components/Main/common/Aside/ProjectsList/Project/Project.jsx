import { PropTypes } from 'mobx-react'
import { useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Modal from '../../../../../common/Modal/Modal'
import ChangeProject from '../ChangeProject/ChangeProject'
import DeleteProject from '../DeleteProject/DeleteProject'
import changeImg from '../images/change.svg'
import dopIcon from '../images/dop.svg'
import trashImg from '../images/trash.svg'

export default function Project({ project }) {
	const params = useParams()
	const menuRef = useRef(null)
	const navigate = useNavigate()
	const [menu, setMenu] = useState(false)
	const [visibleDelete, setVisibleDelete] = useState(false)
	const [visibleChange, setVisibleChange] = useState(false)
	console.log(params['*'])
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
		setVisibleDelete(true)
		setMenu(false)

		// axios
		// 	.delete(`http://localhost:3001/api/projects/delete/${project.id}`)
		// 	.then(() => {
		// 		modals.setMiniModal('✔️Проект успешно удален')
		// 		projects.deleteProject(project.id)
		// 		navigate('/')
		// 	})
	}
	return (
		<li>
			<NavLink
				className={params['*'].split('/')[1] == project.id ? 'active' : ''}
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
								Изменить
							</tr>

							<tr onClick={deleteFn}>
								<img src={trashImg} alt='settings' />
								Удалить
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
			{visibleDelete && (
				<Modal visibleFn={setVisibleDelete}>
					<DeleteProject visibleFn={setVisibleDelete} project={project} />
				</Modal>
			)}
		</li>
	)
}
Project.propTypes = {
	project: PropTypes.object,
}
