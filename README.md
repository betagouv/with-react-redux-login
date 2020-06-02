# with-react-redux-login

React Redux hoc component for rendering page only on user log success.

[![CircleCI](https://circleci.com/gh/betagouv/with-react-redux-login/tree/master.svg?style=svg)](https://circleci.com/gh/betagouv/with-react-redux-login/tree/master)
[![npm version](https://img.shields.io/npm/v/with-react-redux-login.svg?style=flat-square)](https://npmjs.org/package/with-react-redux-login)

## Basic Usage

### Using redux-saga-data or redux-thunk-data

See first the store install process in [redux-saga-data](https://github.com/betagouv/redux-saga-data).

Then you can declare a login component like this:

```javascript
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withLogin from 'with-react-redux-login'


const withLoginRedirectToSigninWhenNotAuthenticated = compose(
  withRouter,
  withLogin({
    currentUserApiPath: '/users/current',
    handleFail: (state, action, ownProps) => {
      const { history } = ownProps
      history.push('/signin')
    },
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

## Usage with config

See first the store install process in [fetch-normalize-data](https://github.com/betagouv/fetch-normalize-data).
