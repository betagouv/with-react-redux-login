import 'babel-polyfill'

import { mount } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import { configureTestStore,
  configureFetchCurrentUserWithLoginFail,
  configureFetchCurrentUserWithLoginSuccess
} from './configure'
import { Foo } from './Foo'
import { Signin } from './Signin'
import { withLogin } from '../withLogin'

describe('src | components | pages | hocs | withLogin', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('functions', () => {
    describe('login with success', () => {
      it('should render test component when login is a success', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin()(Foo)
        configureFetchCurrentUserWithLoginSuccess()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Route path="/test">
                <LoginFoo onMountCallback={done} />
              </Route>
            </Router>
          </Provider>
        )
      })
    })
    describe('login with fail', () => {
      it('should redirect to failRedirect when login is a fail', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin({
          failRedirect: () => "/signin"
        })(Foo)
        configureFetchCurrentUserWithLoginFail()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route path="/test">
                  <LoginFoo />
                </Route>
                <Route path="/signin">
                  <Signin onMountCallback={done} />
                </Route>
              </Switch>
            </Router>
          </Provider>
        )
      })
    })
  })
})
