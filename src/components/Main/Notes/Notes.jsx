import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import modals from '../../../store/modals'

import './styles/notes.less'

export default function Notes() {
	const params = useParams()
	const editorRef = useRef(null)
	const [text, setText] = useState('')
	useEffect(() => {
		axios
			.get(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/one/${
					params.id
				}`
			)
			.then(res => {
				console.log(res.data)
				setText(res.data.notes)
			})
	}, [params])
	const log = () => {
		axios
			.patch(
				`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/change/${
					params.id
				}`,
				{
					notes: editorRef.current.getContent(),
				}
			)
			.then(() => {
				modals.setMiniModal('✔️ Заметки сохранены!')
			})
		console.log(editorRef.current.getContent())
	}
	return (
		<div className='notes'>
			<Editor
				apiKey='2bnk9275dbun26rkjp2v62w7lobc5rk9jvacducwa0mv1x07'
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={text}
				init={{
					height: 400,
					menubar: false,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style:
						'body { font-family:SF,Arial,sans-serif; font-size:14px }',
				}}
			/>
			<button onClick={log}>Сохранить!</button>
		</div>
	)
}
