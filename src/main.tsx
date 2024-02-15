import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { store } from './store';
import { AuthStageProvider, DialogProvider, UserProvider } from './store/context.tsx';
import { persistor } from './store/store.ts';
import "./components/shapes/CustomHeartShape.ts"

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
          {/* <ErrorModal /> */}
        </Provider>
      </UserProvider>
    </AuthStageProvider>
  );
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthStageProvider>
    <UserProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <App />
          {/* <ErrorModal /> */}
        </Provider>
      </PersistGate>
    </UserProvider>
  </AuthStageProvider>,
  // {/* </React.StrictMode>, */}
);
