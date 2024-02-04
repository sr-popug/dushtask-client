import axios from 'axios'
import { PropTypes } from 'mobx-react'
import { useRef, useState } from 'react'

export default function ChangeImg({ user, visibleFn }) {
	const file = useRef(null)
	const [previewSrc, setPreviewSrc] = useState('')
	const [fileState, setFileState] = useState(false)
	function showPreview(event) {
		if (event.target.files.length > 0) {
			setFileState(true)
			var src = URL.createObjectURL(event.target.files[0])

			setPreviewSrc(src)
		} else {
			src = ''
			setPreviewSrc('')
		}
	}
	const [error, setError] = useState(null)
	const submit = e => {
		e.preventDefault()

		if (file.current.files[0]) {
			const formData = new FormData()
			formData.append('img', file.current.files[0] || '')
			console.log(formData)

			axios
				.patch(
					`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/users/changePhoto/${
						user.id
					}`,
					formData
				)
				.then(() => {
					visibleFn(false)
					location.reload()
				})
				.catch(err => {
					setError(`❌ ${err.message}`)
				})
		} else {
			setFileState(false)
			setError('❌ File not upload!')
		}
	}
	return (
		<form onSubmit={submit} className='change-profile change-photo'>
			<h3>Choose a photo</h3>
			<div className='pass'>
				{fileState && (
					<div className='preview'>
						<img src={previewSrc} id='file-ip-1-preview' />
					</div>
				)}
				{!fileState && <div className='not-photo'>Prewiew of photo</div>}

				<label className='input-file'>
					<input
						name='file'
						accept='image/png'
						className='input-file'
						onChange={showPreview}
						ref={file}
						type='file'
						placeholder='Password'
						id='password'
					/>
					<span className='input-file-btn'>Choose image</span>
				</label>
			</div>

			<button type='submit'>Change!</button>
			<div className='error'>{error}</div>
		</form>
	)
}
ChangeImg.propTypes = {
	visibleFn: PropTypes.function,
	user: PropTypes.objectOrObservableObject,
}
