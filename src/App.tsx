import { GoogleOAuthProvider, } from "@react-oauth/google"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { NotFound, Signin, Signup } from "./features"
import AuthPrivate from "./features/private/AuthPrivate"
import Password from "./features/Password"
import LoginOptions from "./features/LoginOptions"
import Passkey from "./features/Passkey"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route index path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password" element={
        <AuthPrivate options={1}>
          <Password />
        </AuthPrivate>
      } />
      <Route path="/login-options" element={
        <AuthPrivate options={2}>
          <LoginOptions />
        </AuthPrivate>
      } />
      <Route path="/passkey" element={
        <AuthPrivate options={3}>
          <Passkey />
        </AuthPrivate>
      } />
    </Route>
  ))
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
