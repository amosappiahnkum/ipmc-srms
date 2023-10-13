import { connect } from 'react-redux'
import { getAllUsers, setUserData } from '../../actions/users/UserAction'
import User from '../../components/users'

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
})

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => getAllUsers(),
  setGroupData: (payload) => dispatch(setUserData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
