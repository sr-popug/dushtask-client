import { NavLink } from 'react-router-dom'
import './styles/footer.css'

export default function Footer() {
	return (
		<footer>
			<div className='top'></div>
			<div className='left-right'>
				<div className='left'>
					<p>
						<strong>This</strong> website for the purpose of adding it to my
						portfolio for hiring or taking freelance orders.
					</p>
				</div>
				<div className='right'>
					<NavLink to='/login'>
						<button>Purchase A Subscription</button>
					</NavLink>
				</div>
			</div>
			<div className='bottom'>© Anton Tsukanov 2024 - All rights reserved</div>
		</footer>
	)
}
