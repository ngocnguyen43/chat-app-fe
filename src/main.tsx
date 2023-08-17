import { LazyMotion, domMax } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './store';
import { AuthStageProvider, UserProvider } from './store/context.tsx';

export default () => {
  return (
    <AuthStageProvider>
      <UserProvider>
        <Provider store={store}>
          <LazyMotion features={domMax}>
            <App />
          </LazyMotion>
        </Provider>
      </UserProvider>
    </AuthStageProvider>

  )
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthStageProvider>
    <UserProvider>
      <Provider store={store}>
        <LazyMotion features={domMax}>
          <App />
        </LazyMotion>
      </Provider>
    </UserProvider>
  </AuthStageProvider>
  // {/* </React.StrictMode>, */}
)
