import { createDataReducer } from 'fetch-normalize-data'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

export const configureTestStore = () => {
  const storeEnhancer = applyMiddleware(
    thunk.withExtraArgument({ rootUrl: 'http://foo.com' })
  )

  const rootReducer = combineReducers({
    data: createDataReducer(),
  })

  return createStore(rootReducer, storeEnhancer)
}

export const configureFetchCurrentUserWithServerError = () => {
  fetch.mockResponse(JSON.stringify([{ global: ['Server error, sorry !'] }]), {
    status: 500,
  })
}

export const configureFetchCurrentUserWithLoginFail = () => {
  fetch.mockResponse(
    JSON.stringify([{ auth: ['Nobody is authenticated here'] }]),
    { status: 401 }
  )
}

export const configureFetchCurrentUserWithLoginSuccess = () => {
  fetch.mockResponse(JSON.stringify({ email: 'michel.marx@youpi.fr' }), {
    status: 200,
  })
}
