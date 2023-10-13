import React, { createContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
const FetchContext = createContext()
const { Provider } = FetchContext

function FetchProvider ({ children }) {
  // const token = document.head.querySelector('meta[name="csrf-token"]')

  const makeRequest = axios.create({
    baseURL: process.env.MIX_REACT_APP_API_PATH
  })
  axios.get('/sanctum/csrf-cookie').then(() => {
    makeRequest.interceptors.request.use(function (config) {
      // config.headers.Authorization = `Bearer ${authContext.authState.token}`
      return config
    }, function (error) {
      return Promise.reject(error)
    })
  })

  makeRequest.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const code = error && error.response ? error.response.status : 0
      if (code === 401 || code === 403 || code === 419) {
        // console.log('error code', code)
        window.location.replace('/login')
      }
      return Promise.reject(error)
    }
  )

  return (
        <Provider
            value={{
              makeRequest
            }}
        >
            {children}
        </Provider>
  )
}
FetchProvider.propTypes = {
  children: PropTypes.node.isRequired
}
export { FetchContext, FetchProvider }
