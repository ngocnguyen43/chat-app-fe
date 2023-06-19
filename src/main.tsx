import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthStageProvider, UserProvider } from './store/context.tsx'
import { Provider } from 'react-redux'
import { store } from "./store"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthStageProvider>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </AuthStageProvider>
  </React.StrictMode>,
)
