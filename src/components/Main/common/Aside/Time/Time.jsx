import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import projects from '../../../../../store/projects'
import './styles/time.less'
const sumTime = times => {
	let sum = ''
	for (let i = 0; i < times.length; i++) {
		if (i == 0) {
			sum = times[i]
			continue
		} else {
			var a = sum.split(':')
			var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
			var b = times[i].split(':')
			var seconds2 = +b[0] * 60 * 60 + +b[1] * 60 + +b[2]
			var date = new Date(1970, 0, 1)
			date.setSeconds(seconds + seconds2)
			sum = date.toTimeString().replace(/.*(\d{2}.\d{2}.\d{2}).*/, '$1')
		}
	}
	return sum
}
const Time = observer(() => {
	const params = useParams()
	const [time, setTime] = useState('00.00')
	const [seconds, setSeconds] = useState(1)
	const projectJs = projects.getProjects()
	let [hour, setHour] = useState('')
	const timesArr = projectJs.reduce((calc, project) => {
		return [...calc, project.time]
	}, [])
	useEffect(() => {
		setTime('00.00')
		setTime(sumTime(timesArr))
		setTime(
			prev =>
				Number(prev.split(':')[0]) +
				'.' +
				Math.floor(Number(prev.split(':')[1]) / 6)
		)

		axios.patch(
			`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/time/${
				params['*'].split('/')[1]
			}`,
			{ seconds }
		)
		clearTimeout(timeOut)
		setSeconds(0)
		if (Number(time.split('.')[0] == 1)) {
			setHour('час')
		} else if (
			Number(time.split('.')[0] == 2) ||
			Number(time.split('.')[0] == 3) ||
			Number(time.split('.')[0] == 4)
		) {
			setHour('часа')
		} else {
			setHour('часов')
		}
	}, [params, projectJs])

	const timeOut = setTimeout(() => {
		setSeconds(prev => prev + 1)
	}, 2000)

	return (
		<article className='time'>
			<h3>Время</h3>
			<p className='total'> ВСЕГО ЧАСОВ</p>
			<strong>
				{time} {hour}
			</strong>
		</article>
	)
})
export default Time
