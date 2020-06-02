import { connect } from 'react-redux'

import resolveCurrentUser from './resolveCurrentUser'
import selectCurrentUser from './selectCurrentUser'
import withLogin from './withLogin'

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
})

export default config =>
  withLogin({ ...config, ...{ withDispatcher: connect(mapStateToProps) } })

export { resolveCurrentUser, selectCurrentUser }
