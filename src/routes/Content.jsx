import { observer } from 'mobx-react-lite'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home/Home'
import Info from '../components/Info/Info'
import Main from '../components/Main/Main'
import Notes from '../components/Main/Notes/Notes'
import Overview from '../components/Main/Overview/Overview'
import SubTasks from '../components/Main/SubTasks/SubTasks'
import Tasks from '../components/Main/Tasks/Tasks'
import MainAside from '../components/Main/common/Aside/MainAside'
import Profile from '../components/Profile/Profile'
import Footer from '../components/common/Footer/Footer'
import Header from '../components/common/Header/Header'
import TopHeader from '../components/common/TopHead/TopHead'
import RequireAuth from './PrivateRoute'

const Content = observer(() => {
	return (
		<>
			<Header />

			<main>
				<MainAside />
				<div className='content'>
					<TopHeader />

					<Routes>
						<Route
							path='profile'
							element={
								<RequireAuth>
									<Profile />
								</RequireAuth>
							}
						/>
						<Route path='/info' element={<Info />} />
						<Route path='/' element={<Home />} />
						<Route
							path='/project/:id/tasks'
							element={
								<RequireAuth>
									<Main>
										<Tasks />
									</Main>
								</RequireAuth>
							}
						/>
						<Route
							path='/project/:id/tasks/task/:taskId'
							element={
								<RequireAuth>
									<Main>
										<SubTasks />
									</Main>
								</RequireAuth>
							}
						/>
						<Route
							path='/project/:id/overview'
							element={
								<RequireAuth>
									<Main>
										<Overview />
									</Main>
								</RequireAuth>
							}
						/>
						<Route
							path='/project/:id/notes'
							element={
								<RequireAuth>
									<Main>
										<Notes />
									</Main>
								</RequireAuth>
							}
						/>
					</Routes>
				</div>
			</main>
			<Footer />
		</>
	)
})
export default Content
