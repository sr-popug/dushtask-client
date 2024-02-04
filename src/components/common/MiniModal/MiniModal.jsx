import { observer } from 'mobx-react-lite'
import modals from '../../../store/modals'
import './styles/minimodal.css'
const MiniModal = observer(() => {
	return <div className='mini-modal'>{modals.miniModal}</div>
})
export default MiniModal
