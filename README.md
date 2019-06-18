# with-react-redux-login

React Redux hoc component for rendering page only on user log success.

[![CircleCI](https://circleci.com/gh/betagouv/with-react-redux-login/tree/master.svg?style=svg)](https://circleci.com/gh/betagouv/with-react-redux-login/tree/master)
[![npm version](https://img.shields.io/npm/v/with-react-redux-login.svg?style=flat-square)](https://npmjs.org/package/with-react-redux-login)

## Basic Usage

### Using redux-saga-data

See first the store install process in [redux-thunk-data](https://github.com/betagouv/redux-saga-data).

Then you can declare a login component like this:

```javascript
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withLogin from 'with-react-redux-login'

const withLoginRedirectToSigninWhenNotAuthenticated = compose(
  withRouter,
  withLogin({
    currentUserApiPath: '/users/current',
    handleFail: (state, action, { history }) => history.push('/signin'),
  })
)

const FooPage = () => {
  // withLogin passes a currentUser props
  const { currentUser } = this.props
  const { email } = currentUser || {}
  return (
    <div>
      I am connected with {email} !
    </div>
  )
}

export default compose(withLoginRedirectToSigninWhenNotAuthenticated)(FooPage)
```

Depending on what returns GET 'https://myfoo.com/users/current':

  - if it is a 200 with { email: 'michel.momarx@youpi.fr' }, FooPage will be rendered,
  - if it is a 400, app will redirect to '/signin' page.

### Using redux-thunk-data

Like above, see the install process in [redux-thunk-data](https://github.com/betagouv/redux-thunk-data).

Then you need just to slightly change setup:

```javascript
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'
import withLogin from 'with-react-redux-login'

const withLoginRedirectToSigninWhenNotAuthenticated = compose(
  withRouter,
  withLogin({
    currentUserApiPath: '/users/current',
    handleFail: (state, action, { history }) => history.push('/signin'),
    // and also the 'promised' action creator
    requestData
  })
)
...
```

## Usage with config

See first the store install process in [redux-thunk-data](https://github.com/betagouv/redux-saga-data).
