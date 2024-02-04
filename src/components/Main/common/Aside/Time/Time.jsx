import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import projects from '../../../../../store/projects'
import './styles/time.css'

const Time = observer(() => {
	const params = useParams()
	const [time, setTime] = useState('00:00:00')
	const [seconds, setSeconds] = useState(1)
	const projectJs = projects.getProjects()
	useEffect(() => {}, [])
	useEffect(() => {
		projectJs.forEach(project => {
			setTime(
				prev =>
					Number(prev.split(':')[0]) +
					Number(project.time.split(':')[0]) +
					':' +
					Math.floor(
						Number(prev.split(':')[1]) + Number(project.time.split(':')[1])
					)
			)
		})

		axios.patch(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/time/${
				params['*'].split('/')[1]
			}`,
			{ seconds }
		)
	}, [params, projectJs])

	setTimeout(() => {
		setSeconds(prev => prev + 1)
	}, 2000)

	return (
		<article className='time'>
			<h3>Time</h3>
			<p className='total'> TOTAL HOURS</p>
			<strong>
				{time.split(':')[0]}.{Math.floor(Number(time.split(':')[1]) / 10)} hours
			</strong>
		</article>
	)
})
export default Time
