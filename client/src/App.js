import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import AuthLayout from './layouts/AuthLayout'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Toast from './components/Toast'
import { checkAuth } from './globalStore/ducks/userAuth'
import Search from './pages/Search'

function App() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.userAuth)

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <>
      <Toast />
      <Header isAuth={isAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
          <Route path="*" element={<h1>Nothing is here</h1>} />
        </Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  )
}

export default App
