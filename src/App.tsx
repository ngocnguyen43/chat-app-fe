import 'react-multi-carousel/lib/styles.css';

import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import Spinner from './components/atoms/Spinner';
import EmptyChat from './components/EmptyChat';
import { NotFound } from './features';
import AuthPrivate from './features/private/AuthPrivate';
import OTPPage from './features/OTPPage';
import { lazy, Suspense } from 'react';
import LoginOptions from './features/LoginOptions';
import NewChat from './components/NewChat';
import { queryClient } from './service';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MainChat = lazy(() => import('./components/new/MainChat'));

const Password = lazy(() => import('./features/Password'));
const Passkey = lazy(() => import('./features/Passkey'));
// const NotFound = lazy(() => import("./features/error/404"))
const Signin = lazy(() => import('./features/Signin'));
const Signup = lazy(() => import('./features/Signup'));
// const OTPPage = lazy(() => import('./features/OTPPage'));
const Video = lazy(() => import('./components/Video'));
const Layout = lazy(() => import('./features/Layout'));
const Setup = lazy(() => import('./features/Setup'));
// const Test = lazy(() => import("./features/Test"))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route
        path="/me"
        element={
          <Suspense
            fallback={
              <div className="w-full h-screen flex items-center justify-center">
                <Spinner size="loading-lg" />
              </div>
            }
          >
            <Layout />
          </Suspense>
        }
      >
        <Route path="" element={<EmptyChat />} />
        <Route path="new" element={<NewChat />} />
        <Route
          path=":id"
          element={
            <Suspense
              fallback={
                <div className="w-[75%] h-screen flex items-center justify-center">
                  <Spinner size="loading-lg" />
                </div>
              }
            >
              <MainChat />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/setup"
        element={
          <Suspense fallback={<section></section>}>
            <Setup />
          </Suspense>
        }
      />
      <Route
        path="/verify"
        element={
          <Suspense fallback={<section></section>}>
            <OTPPage />
          </Suspense>
        }
      />
      <Route
        index
        path="/signin"
        element={
          <Suspense fallback={<section className="w-full h-full"></section>}>
            <Signin />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<section className=""></section>}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/password"
        element={
          <Suspense fallback={<section> </section>}>
            <AuthPrivate options={1}>
              <Password />
            </AuthPrivate>
          </Suspense>
        }
      />
      <Route
        path="/login-options"
        element={
          <Suspense fallback={<section> </section>}>
            <AuthPrivate options={2}>
              <LoginOptions />
            </AuthPrivate>
          </Suspense>
        }
      />
      <Route
        path="/passkey"
        element={
          <Suspense fallback={<section></section>}>
            <AuthPrivate options={3}>
              <Passkey />
            </AuthPrivate>
          </Suspense>
        }
      />
      <Route
        path="/video/:id"
        element={
          <Suspense fallback={<section></section>}>
            <Video />
          </Suspense>
        }
      />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
export default App;
