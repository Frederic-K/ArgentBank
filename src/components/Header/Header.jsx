import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, logOut } from '../../features/UserSlice'
import ArgentBankLogo from '../../assets/argentBankLogo.png'

export default function Header() {
  const dispatch = useDispatch()
  const { isAuthenticated, firstName } = useSelector(userSelector)

  const handelLogOut = (event) => {
    event.preventDefault()
    dispatch(logOut())
  }
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!isAuthenticated ? (
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </NavLink>
            <NavLink to="/" className="main-nav-item" onClick={handelLogOut}>
              Sign Out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
