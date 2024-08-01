import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <KindeProvider
        clientId='b2e2e0b9e3f244638a435771e7e0b8ea'
        domain='https://localbrand.kinde.com'
        redirectUri='http://localhost:5173'
        logoutUri='http://localhost:5173'
      >
        <App />
      </KindeProvider>
    </Provider>
  </React.StrictMode>
)
