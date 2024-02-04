import axios from 'axios'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateProject from './components/Main/CreateProject/CreateProject'
import Login from './components/auth/Login/Login'
import Registration from './components/auth/Registration/Registration'
import MiniModal from './components/common/MiniModal/MiniModal'
import Content from './routes/Content'
import RequireAuth from './routes/PrivateRoute'
import projects from './store/projects'
import user from './store/user'

// Есть такой тег, который отрисовывает только первый элемент с тагим path мне он нужен
function App() {
	useEffect(() => {
		var userItem = {}
		if (localStorage.getItem('user')) {
			userItem = JSON.parse(localStorage.getItem('user'))
			axios
				.get(
					`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/projects/byUserId/${
						user.getUser().id
					}`
				)
				.then(res => {
					projects.setProjects(res.data)
				})
		} else return
		axios
			.post(`${import.meta.env.VITE_REACT_API_SERVER_URL}/api/users/login`, {
				email: userItem.email,
				password: userItem.password,
			})
			.then(res => {
				user.deleteUser()
				user.setUser({
					email: res.data.email,
					password: res.data.password,
					name: res.data.name,
					roles: res.data.roles,
					img: res.data.img,
					id: res.data.id,
				})
			})
			.then(() => {
				axios
					.get(
						`${
							import.meta.env.VITE_REACT_API_SERVER_URL
						}/api/projects/byUserId/${user.getUser().id}`
					)
					.then(res => {
						projects.setProjects(res.data)
					})
			})
			.then(() => {})
	}, [])
	return (
		<>
			<Routes>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/*' element={<Content />} />
				<Route
					path='/create_project'
					element={
						<RequireAuth>
							<CreateProject />
						</RequireAuth>
					}
				/>
			</Routes>
			<MiniModal />
		</>
	)
}

export default App
