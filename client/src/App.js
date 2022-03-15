import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

import AuthLayout from './layouts/AuthLayout'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
          <Route path="*" element={<h1>Nothing is here</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
