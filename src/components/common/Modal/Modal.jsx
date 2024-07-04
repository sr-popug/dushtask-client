import { PropTypes } from 'prop-types'
import './styles/modal.less'
export default function Modal({ children, visibleFn }) {
	function setClose() {
		visibleFn(false)
	}
	return (
		<div className='back_modal'>
			<div onClick={setClose} className='modal_background'>
				{' '}
			</div>
			<div className='modal'>
				<button onClick={setClose} className='close'></button>
				{children}
			</div>
		</div>
	)
}
Modal.propTypes = {
	children: PropTypes.component,
	visibleFn: PropTypes.func,
}
