import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { userSelector } from '../../features/User/UserSlice'

const ProtectedRoutes = ({ redirectPath = '/', auth, children }) => {
  if (!auth) {
    return <Navigate to={redirectPath} />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoutes
