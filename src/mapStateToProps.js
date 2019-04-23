import { selectCurrentUser } from 'with-react-login'

export function mapStateToProps (state) {
  return {
    currentUser: selectCurrentUser(state)
  }
}

export default mapStateToProps
