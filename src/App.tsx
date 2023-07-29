import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthPrivate from "./features/private/AuthPrivate"
import Setting from './features/Setting'
import InputSocket from './features/InputSocket'
import Socket from './features/Socket'
const Password = React.lazy(() => import("./features/Password"))
const LoginOptions = React.lazy(() => import("./features/LoginOptions"))
const Passkey = React.lazy(() => import("./features/Passkey"))
const NotFound = React.lazy(() => import("./features/error/404"))
const Signin = React.lazy(() => import("./features/Signin"))
const Signup = React.lazy(() => import("./features/Signup"))
const Test = React.lazy(() => import("./features/Test"))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route path="/" element={<InputSocket />} />
      <Route path="/socket" element={<Socket />} />
      <Route index path="/signin"
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Signin />
          </React.Suspense>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <AuthPrivate options={1}>
            <Password />
          </AuthPrivate>
        </React.Suspense>
      } />
      <Route path="/login-options" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <AuthPrivate options={2}>
            <LoginOptions />
          </AuthPrivate>
        </React.Suspense>
      } />
      <Route path="/passkey" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <AuthPrivate options={3}>
            <Passkey />
          </AuthPrivate>
        </React.Suspense>
      } />
      <Route path='/setting' element={<Setting />} />
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
