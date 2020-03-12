import '@babel/polyfill'
import { mount } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { mergeData, requestData } from 'redux-thunk-data'

import {
  configureTestStore,
  configureFetchCurrentUserWithLoginFail,
  configureFetchCurrentUserWithLoginSuccess,
} from './configure'
import { Foo } from './Foo'
import { Signin } from './Signin'
import withLogin from '../index'

describe('index', () => {
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
        const LoginFoo = withLogin({
          requestData,
        })(Foo)
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
          handleFail: () => history.push('/signin'),
          requestData,
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
      it('makes sure to delete old currentUser when login fail', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        store.dispatch(
          mergeData({ users: [{ id: 'AE', __IS_CURRENT__: true }] })
        )
        const LoginFoo = withLogin({
          handleFail: () => history.push('/signin'),
          requestData,
        })(Foo)
        configureFetchCurrentUserWithLoginFail()
        function handleMountCallback() {
          expect(store.getState().data.users).toStrictEqual([])
          done()
        }

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route path="/test">
                  <LoginFoo />
                </Route>
                <Route path="/signin">
                  <Signin onMountCallback={handleMountCallback} />
                </Route>
              </Switch>
            </Router>
          </Provider>
        )
      })
    })
  })
})
