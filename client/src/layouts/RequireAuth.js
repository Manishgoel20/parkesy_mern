import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.userAuth)
  const location = useLocation()

  console.log(allowedRoles?.includes(userInfo?.role))
  console.log(location)

  return allowedRoles?.includes(userInfo?.role) ? (
    <Outlet />
  ) : userInfo ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default RequireAuth
