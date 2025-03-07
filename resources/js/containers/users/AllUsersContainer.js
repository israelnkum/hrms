import { connect } from 'react-redux'
import AllUsers from '../../components/users/all-users'
import { getAllUsers, setUserData } from '../../actions/users/UserAction'

const mapStateToProps = (state) => ({
  users: state.user.users
})

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (payload) => dispatch(getAllUsers(payload)),
  setUserData: (payload) => dispatch(setUserData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
