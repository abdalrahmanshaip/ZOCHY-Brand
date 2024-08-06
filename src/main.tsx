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
        redirectUri='https://zochy-brand.vercel.app/'
        logoutUri='https://zochy-brand.vercel.app/'
      >
        <App />
      </KindeProvider>
    </Provider>
  </React.StrictMode>
)
