import { PropTypes } from 'prop-types'
import Head from './common/Head/Head'
import './styles/main.less'

export default function Main({ children }) {
	return (
		<section className='main-content'>
			<div className='main'>
				<Head />
				<div className='main-children'>{children}</div>
			</div>
		</section>
	)
}
Main.propTypes = {
	children: PropTypes.component,
}
