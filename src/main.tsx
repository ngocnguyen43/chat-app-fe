import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import ErrorModal from './features/error/ErrorModal.tsx';
import { store } from './store';
import { AuthStageProvider, UserProvider } from './store/context.tsx';

export default () => {
  return (
    <AuthStageProvider>
      <UserProvider>
        <Provider store={store}>
          <App />
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
        <App />
        <ErrorModal />
      </Provider>
    </UserProvider>
  </AuthStageProvider>,
  // {/* </React.StrictMode>, */}
);
