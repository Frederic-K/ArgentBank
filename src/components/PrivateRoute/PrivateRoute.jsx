import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/User/UserSlice'

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector(userSelector)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children ? children : <Outlet />
}
