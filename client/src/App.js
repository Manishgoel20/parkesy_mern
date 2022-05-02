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
import Dashboard from './layouts/Dashboard'
import ParkadeForm from './pages/ParkadeForm'
import MyParkades from './pages/MyParkades'
import EditParkade from './pages/EditParkade'
import RequireAuth from './layouts/RequireAuth'
import AllParkades from './pages/AllParkades'
import RequestedParkades from './pages/RequestedParkades'

function App() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.userAuth)

  const roles = { user: 'user', provider: 'provider', admin: 'admin' }

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  return (
    <>
      <Toast />
      <Header />

      <Routes>
        {/* <Route
            element={
              <RequireAuth allowedRoles={[roles.provider, roles.admin]} />
            }
          > */}
        <Route path="/" element={<Home />} />
        <Route
          path="/search/:lat/:lng/:stTime/:enTime/:vehicle"
          element={<Search />}
        />

        <Route path="/" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
          <Route path="*" element={<h1>Nothing is here</h1>} />
        </Route>

        <Route path="/user" element={<Dashboard roles={roles} />}>
          <Route path="profile" element={<h1>profile</h1>} />
          <Route path="my-parkades" element={<MyParkades />} />
          <Route path="my-parkades/:parkadeId/edit" element={<EditParkade />} />
          <Route path="add-parkade" element={<ParkadeForm />} />
          <Route path="all-parkades" element={<AllParkades />} />
          <Route path="new-requests" element={<RequestedParkades />} />
          <Route path="*" element={<h1>Nothing is here</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
