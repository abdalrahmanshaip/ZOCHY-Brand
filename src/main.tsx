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
        clientId='75563ce8d6674be8a452f8219e4aed89'
        domain='https://localbrand.kinde.com'
        redirectUri='https://zochy-brand.vercel.app/'
        logoutUri='https://zochy-brand.vercel.app/'
      >
        <App />
      </KindeProvider>
    </Provider>
  </React.StrictMode>
)
