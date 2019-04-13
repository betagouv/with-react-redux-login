import { connect } from 'react-redux'
import { compose } from 'redux'
import _withLogin from 'with-react-login'

import mapStateToProps from './mapStateToProps'

export const withLogin = config => compose(
  connect(mapStateToProps),
  _withLogin(config)
)

export default withLogin
