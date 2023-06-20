import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { NotFound, Signin, Signup } from "./features"
import AuthPrivate from "./features/private/AuthPrivate"
import Password from "./features/Password"
import LoginOptions from "./features/LoginOptions"
import Passkey from "./features/Passkey"
import Test from "./features/Test"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />}>
      <Route path="/" element={<Test />} />
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
    <RouterProvider router={router} />
  )
}

export default App
