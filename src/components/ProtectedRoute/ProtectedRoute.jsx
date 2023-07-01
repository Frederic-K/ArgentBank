import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { userSelector } from '../../features/User/UserSlice'

const ProtectedRoute = ({ redirectPath = '/', isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
