import { selectCurrentUser } from 'with-react-login'

function mapStateToProps (state) {
  return {
    currentUser: selectCurrentUser(state)
  }
}

export default mapStateToProps
