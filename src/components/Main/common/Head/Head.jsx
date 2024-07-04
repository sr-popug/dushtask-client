import Navbar from './Navbar/Navbar'
import Progress from './Progress/Progress'
import './styles/head.less'
export default function Head() {
	return (
		<header className='head-project'>
			<div className='top'>
				<Progress />
			</div>
			<Navbar />
		</header>
	)
}
