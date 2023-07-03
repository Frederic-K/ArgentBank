import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/User/UserSlice'

export default function PrivateRoute({ children }) {
  const { token } = useSelector(userSelector)
  if (!token) {
    return <Navigate to="/" />
  }
  return children ? children : <Outlet />
}
