import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import ErrorModal from './features/error/ErrorModal.tsx';
import { store } from './store';
import { AuthStageProvider, DialogProvider, UserProvider } from './store/context.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store.ts';

export default () => {
  return (
    <AuthStageProvider>
      <UserProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DialogProvider>
              <App />
            </DialogProvider>
          </PersistGate>
          <ErrorModal />
        </Provider>
      </UserProvider>
    </AuthStageProvider>
  );
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthStageProvider>
    <UserProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DialogProvider>
            <App />
          </DialogProvider>
        </PersistGate>
        <ErrorModal />
      </Provider>
    </UserProvider>
  </AuthStageProvider>,
  // {/* </React.StrictMode>, */}
);
