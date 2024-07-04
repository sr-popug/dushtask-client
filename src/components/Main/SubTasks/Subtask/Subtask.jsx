import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useRef, useState } from 'react'
import modals from '../../../../store/modals'
import changeImg from '../images/change.svg'
import trashImg from '../images/trash.svg'
export default function Subtask({ subtask }) {
	const changeTitle = useRef(null)
	const changeDescription = useRef(null)
	const [descriptionValue, setDescriptionValue] = useState(subtask.description)
	const [titleValue, setTitleValue] = useState(subtask.title)
	const [isChanged, setIsChanged] = useState(false)
	function submitChange(e, id) {
		console.log(id)
		e.preventDefault()
		axios
			.patch(
				`${
					import.meta.env.VITE_REACT_API_SERVER_URL
				}/api/subtasks/change/${id}`,
				{
					title: changeTitle.current.value,
					description: changeDescription.current.value,
				}
			)
			.then(() => {
				modals.setMiniModal('✔️Подзадача успешно изменена!')
				setIsChanged(false)
			})
	}
	function inputTitle(e) {
		setTitleValue(e.target.value)
	}
	function inputDescription(e) {
		setDescriptionValue(e.target.value)
	}
	async function changeBtn() {
		await setIsChanged(prev => !prev)
		setTitleValue(subtask.title)
		setDescriptionValue(subtask.description)
	}
	function deleteBtn(id) {
		axios
			.delete(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/subtasks/delete/${id}`
			)
			.then(() => {
				modals.setMiniModal('✔️Подзадача успешно удалена')
			})
	}
	function checkedFn(id) {
		axios.patch(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/subtasks/complete/${id}`
		)
	}
	return (
		<div className={`subtask ${subtask.isComplete ? 'checked' : ''}`}>
			<div className='checkbox'>
				<input
					defaultChecked={subtask.isComplete ? 'checked' : ''}
					type='checkbox'
					id={`isComplete${subtask.id}`}
					onClick={() => checkedFn(subtask.id)}
				/>
				<label htmlFor={`isComplete${subtask.id}`}></label>
			</div>
			{!isChanged && (
				<div className='text'>
					<h4 className='title'>{subtask.title}</h4>

					<p className='description'>{subtask.description}</p>
				</div>
			)}
			{isChanged && (
				<form onSubmit={e => submitChange(e, subtask.id)} className='text'>
					<input
						value={titleValue}
						onChange={inputTitle}
						ref={changeTitle}
						type='text'
						className='title'
						placeholder='Заголовок'
					/>
					<textarea
						onChange={inputDescription}
						value={descriptionValue}
						ref={changeDescription}
						cols={65}
						rows={5}
						placeholder='Описание'
						className='description'
						type='text'
					/>
					<button type='submit'>Сохранить!</button>
				</form>
			)}
			<div className='settings'>
				<button onClick={changeBtn}>
					<img src={changeImg} alt='change' />
				</button>
				<button onClick={() => deleteBtn(subtask.id)}>
					<img src={trashImg} alt='trash' />
				</button>
			</div>
		</div>
	)
}
Subtask.propTypes = {
	subtask: PropTypes.object,
}
