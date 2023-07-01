import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './styles/style.scss'
import { Toaster } from 'react-hot-toast'
import App from './App'
import store from './utils/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // Warning : React StrictMode renders components twice on dev server
  // https://react.dev/reference/react/StrictMode
  // Components will re-render an extra time to find bugs caused by impure rendering.
  // Components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
  // Components will be checked for usage of deprecated APIs.
  <React.StrictMode>
    <Provider store={store}>
      <div className="wrapper">
        <Toaster />
        <App />
      </div>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
