import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import modals from '../../../../store/modals'
import changeImg from '../images/change.svg'
import settingImg from '../images/dop.svg'
import trashImg from '../images/trash.svg'

import Modal from '../../../common/Modal/Modal'
import ChangeTask from '../ChangeTask/ChangeTask,'
import tasksImg from '../images/tasks.svg'

export default function Task({ task }) {
	const [menu, setMenu] = useState(false)
	const [visibleChange, setVisibleChange] = useState(false)
	const menuRef = useRef(null)
	const [sub, setSub] = useState(0)
	const [completeSub, setCompleteSub] = useState(0)
	const [complete, setComplete] = useState('')
	const [procent, setProcent] = useState(0)
	useEffect(() => {
		axios
			.get(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/subtasks/bytaskId/${
					task.id
				}`
			)
			.then(res => {
				setSub(res.data.length)
				res.data.map(el => {
					if (el.isComplete) {
						setCompleteSub(prev => prev + 1)
					}
				})
			})
	}, [])
	useEffect(() => {
		if (sub === completeSub && sub !== 0) {
			setComplete('complete')
		} else setComplete('')

		if (sub != 0) {
			setProcent(Math.floor((completeSub / sub) * 100))
		}
	}, [sub, completeSub])
	const dop = e => {
		e.preventDefault()
		setMenu(p => !p)
	}
	const menuFn = e => {
		e.preventDefault()
		setVisibleChange(true)
		setMenu(false)
	}
	const deleteFn = () => {
		axios
			.delete(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/tasks/delete/${
					task.id
				}`
			)
			.then(() =>
				modals.setMiniModal('✔️The task has been successfully deleted')
			)
	}
	return (
		<>
			<NavLink to={`task/${task.id}`} key={task.id} className='task'>
				<div className='top'>
					<div className={`type ${task.color}`}>{task.type}</div>
					<div onClick={dop} className='settings'>
						<img src={settingImg} alt='settings' />
					</div>
					{menu && (
						<div ref={menuRef} onClick={menuFn} className='menu'>
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
				</div>
				<h3>{task.title}</h3>
				<p className='description'>
					{task.description.split('').slice(0, 100).join('')}
					{task.description.split('').length > 100 ? '...' : ' '}
				</p>

				<div className='bottom'>
					<div className={`tasks ${complete}`}>
						<img src={tasksImg} alt='tasks' />
						<div className='number'>
							{completeSub} / {sub}
						</div>
					</div>
					<div className='comments'>
						<p className={`${complete}`}>{procent} %</p>
					</div>
				</div>
			</NavLink>

			{visibleChange && (
				<div className='add_task_modal'>
					<Modal visibleFn={setVisibleChange}>
						<ChangeTask visibleFn={setVisibleChange} taskID={task.id} />
					</Modal>
				</div>
			)}
		</>
	)
}
Task.propTypes = {
	task: PropTypes.object,
}
