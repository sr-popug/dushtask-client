import { PropTypes } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RequireAuth = observer(({ children }) => {
	const navigate = useNavigate()
	useEffect(() => {
		var userItem = {}
		if (localStorage.getItem('user')) {
			userItem = JSON.parse(localStorage.getItem('user'))
		}

		if (!userItem.email) {
			return navigate('/login')
		}
	}, [navigate])
	return children
})
RequireAuth.propTypes = {
	children: PropTypes.component,
}
export default RequireAuth
