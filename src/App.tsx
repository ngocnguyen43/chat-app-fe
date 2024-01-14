import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider
} from 'react-router-dom';

import EmptyChat from './components/EmptyChat';
import Video from './components/Video';
import AuthPrivate from './features/private/AuthPrivate';
import Setting from './features/Setting';
import Nah from './features/Nah';
import { NotFound, Signup } from './features';
import LoginOptions from './features/LoginOptions';
import Passkey from './features/Passkey';
import Password from './features/Password';
import NewChat from './components/NewChat';
import Spinner from './components/atoms/Spinner';
import Setup from './features/Setup';
const MainChat = React.lazy(() => import('./components/new/MainChat'));

// const Password = React.lazy(() => import("./features/Password"))
// const LoginOptions = React.lazy(() => import("./features/LoginOptions"))
// const Passkey = React.lazy(() => import("./features/Passkey"))
// const NotFound = React.lazy(() => import("./features/error/404"))
const Signin = React.lazy(() => import("./features/Signin"))
// const Signup = React.lazy(() => import("./features/Signup"))
// const Test = React.lazy(() => import("./features/Test"))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      {/* <Route path="/" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <InputSocket />
        </React.Suspense>
      } /> */}
      <Route path="/me" element={
        <React.Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Spinner /></div>}>
          <Nah />
        </React.Suspense>
      } >
        <Route path='' element={<EmptyChat />} />
        <Route path='new' element={<NewChat />} />
        <Route path=':id' element={
          <React.Suspense fallback={<div className='w-[75%] h-screen flex items-center justify-center'><Spinner /></div>}>
            <MainChat />
          </React.Suspense>
        }
        />
      </Route>
      <Route path='/setup' element={<Setup />} />
      {/* <Route path='/contact' element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <LeftSide />
        </React.Suspense>
      }>
        <Route path='' element={<EmptyChat />} />
        <Route path=':id' element={<RightSide />} />
      </Route> */}
      <Route index path="/signin"
        element={
          <React.Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Spinner /></div>}>
            <Signin />
          </React.Suspense>
          // <React.Suspense fallback={<div>Loading...</div>}>
          // </React.Suspense>
        } />
      {/* </React.Suspense>
        } /> */}
      <Route path='/' element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={< Signup />} />
      <Route path="/password" element={
        <React.Suspense fallback={< div > Loading...</div >}>
          <AuthPrivate options={1}>
            <Password />
          </AuthPrivate>
        </React.Suspense >
      } />
      <Route path="/login-options" element={
        <React.Suspense fallback={< div > Loading...</div >}>
          <AuthPrivate options={2}>
            <LoginOptions />
          </AuthPrivate>
        </React.Suspense >
      } />
      <Route path="/passkey" element={
        <React.Suspense fallback={< div > Loading...</div >}>
          <AuthPrivate options={3}>
            <Passkey />
          </AuthPrivate>
        </React.Suspense >
      } />
      <Route path='/setting' element={< Setting />} />
      <Route path='/video/:id' element={<Video />} />
    </Route>
  ))
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
export default App
