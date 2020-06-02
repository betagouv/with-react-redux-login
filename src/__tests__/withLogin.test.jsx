import '@babel/polyfill'
import { mount, shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { assignData, requestData } from 'redux-thunk-data'

import selectCurrentUser from '../selectCurrentUser'
import withLogin from '../withLogin'
import {
  configureTestStore,
  configureFetchCurrentUserWithLoginFail,
  configureFetchCurrentUserWithLoginSuccess,
  configureFetchCurrentUserWithServerError,
} from './configure'
import Foo from './Foo'
import Signin from './Signin'
import Unavailable from './Unavailable'

function noop() {}

describe('src | components | pages | hocs | withLogin', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const LoginFoo = withLogin({
        withDispatcher: WrappedComponent => () => (
          <WrappedComponent dispatch={noop} />
        ),
      })(Foo)

      // when
      const wrapper = shallow(<LoginFoo />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('functions', () => {
    describe('server is available', () => {
      it('should render test component when login is a success', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin({
          requestData,
          withDispatcher: connect(),
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
      it('should redirect to signin when login is a 401 fail', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin({
          handleFail: (state, action) =>
            action.payload.status === 401 && history.push('/signin'),
          requestData,
          withDispatcher: connect(),
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
    describe('server is unavailable', () => {
      it('should redirect to unavailable when no initial current user', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        const LoginFoo = withLogin({
          handleFail: (state, action) =>
            action.payload.status === 500 && history.push('/unavailable'),
          requestData,
          withDispatcher: connect(),
        })(Foo)
        configureFetchCurrentUserWithServerError()

        // then
        mount(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <Route path="/test">
                  <LoginFoo />
                </Route>
                <Route path="/unavailable">
                  <Unavailable onMountCallback={done} />
                </Route>
              </Switch>
            </Router>
          </Provider>
        )
      })
      it('should render test component when current initial user', done => {
        // when
        const history = createBrowserHistory()
        history.push('/test')
        const store = configureTestStore()
        store.dispatch(
          assignData({
            users: [{ __IS_CURRENT__: true, email: 'michel.marx@youpi.fr' }],
          })
        )
        const LoginFoo = withLogin({
          requestData,
          withDispatcher: connect(state => ({
            currentUser: selectCurrentUser(state),
          })),
        })(Foo)
        configureFetchCurrentUserWithServerError()

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
  })
})
