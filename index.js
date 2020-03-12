import { deleteData } from 'fetch-normalize-data'
import _withLogin, {
  resolveCurrentUser,
  selectCurrentUser,
} from 'with-react-login'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
})

const withLogin = config =>
  _withLogin({
    ...config,
    handleFail: (state, action, props) => {
      const { dispatch, currentUser } = props
      if (currentUser) dispatch(deleteData({ users: [{ id: currentUser.id }] }))
      config.handleFail(state, action, props)
    },
    withDispatcher: connect(mapStateToProps),
  })

export { mapStateToProps, resolveCurrentUser, selectCurrentUser }

export default withLogin
