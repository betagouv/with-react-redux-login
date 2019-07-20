import { connect } from 'react-redux'
import _withLogin from 'with-react-login'

import mapStateToProps from './mapStateToProps'

const withLogin = config =>
  _withLogin(
    {...config, ...{ withDispatcher: connect(mapStateToProps) }}
  )

export default withLogin
