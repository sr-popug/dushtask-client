import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useRef, useState } from 'react'
import modals from '../../../store/modals'

export default function ChangeUser({ changeData, user, visibleFn }) {
	const password = useRef(null)

	const [error, setError] = useState(null)
	const submit = e => {
		e.preventDefault()

		if (password.current.value === user.password) {
			axios
				.patch(
					`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/users/${user.id}`,
					changeData
				)
				.then(() => {
					visibleFn(false)

					location.reload()
				})
				.catch(err => {
					modals.setMiniModal(`❌ ${err.message}`)
				})
		} else {
			setError('❌ The entered password is not correct')
		}
	}
	return (
		<form onSubmit={submit} className='change-profile'>
			<h3>Confirm the password</h3>
			<div className='pass'>
				<label htmlFor='password'>Your Password</label>
				<input
					ref={password}
					type='password'
					placeholder='Password'
					id='password'
				/>
			</div>

			<button type='submit'>Change!</button>
			<div className='error'>{error}</div>
		</form>
	)
}
ChangeUser.propTypes = {
	visibleFn: PropTypes.function,
	user: PropTypes.objectOrObservableObject,
	changeData: PropTypes.objectOrObservableObject,
}
