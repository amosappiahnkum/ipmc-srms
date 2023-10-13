import { connect } from 'react-redux'
import Index from '../../components/dashboard'
import { getActiveRoles } from '../../actions/users/UserAction'

const mapStateToProps = (state) => ({
  activeRoles: state.userReducer.activeRoles
})

const mapDispatchToProps = (dispatch) => ({
  getUserActiveRoles: (payload) => dispatch(getActiveRoles(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
