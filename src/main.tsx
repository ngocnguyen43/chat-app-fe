import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthStageProvider, UserProvider } from './store/context.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthStageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthStageProvider>
  </React.StrictMode>,
)
