import { NavLink } from 'react-router-dom'
import './styles/footer.less'

export default function Footer() {
	return (
		<footer>
			<div className='top'></div>
			<div className='left-right'>
				<div className='left'>
					<p>
						<strong>Этот</strong> сайт существует с целью добавления его в мое
						портфолио, для найма или выполнения freelance заказов.
					</p>
				</div>
				<div className='right'>
					<NavLink to='#'>
						<button>Купить подписку</button>
					</NavLink>
				</div>
			</div>
			<div className='bottom'>© Anton Tsukanov 2024 - All rights reserved</div>
		</footer>
	)
}
