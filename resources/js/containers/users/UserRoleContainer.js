import { connect } from 'react-redux'
import { addUserRoles, getUserRoles } from '../../actions/users/UserAction'
import Roles from '../../components/roles'

const mapStateToProps = (state) => ({
  userRoles: state.userReducer.userRoles
})

const mapDispatchToProps = (dispatch) => ({
  getUserRoles: (payload) => dispatch(getUserRoles(payload)),
  addUserRoles: (payload) => dispatch(addUserRoles(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
