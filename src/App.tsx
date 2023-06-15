import { GoogleOAuthProvider, } from "@react-oauth/google"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { NotFound, Signin, Signup } from "./features"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route index path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  ))
function App() {
  return (
    <GoogleOAuthProvider clientId='81181014053-39d1v2rlne1sfpa24j1cf168mn5nqo5k.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
