import { selectCurrentUser } from 'with-react-login'

const mapStateToProps = state => (
  {
    currentUser: selectCurrentUser(state)
  }
)

export default mapStateToProps
