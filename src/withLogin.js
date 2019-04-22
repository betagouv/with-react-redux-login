import { connect } from 'react-redux'
import _withLogin from 'with-react-login'

import mapStateToProps from './mapStateToProps'

export const withLogin = config =>
  _withLogin(
    Object.assign({}, config, { withDispatcher: connect(mapStateToProps) })
  )

export default withLogin
