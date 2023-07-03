import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, logout } from '../../features/User/UserSlice'
import ArgentBankLogo from '../../assets/argentBankLogo.png'
// import { useEffect } from 'react'

export default function Header() {
  const dispatch = useDispatch()
  const { token, firstName } = useSelector(userSelector)

  const heandleLogout = () => {
    dispatch(logout())
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
        {!token ? (
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
            <NavLink
              to="/"
              className="main-nav-item"
              onClick={() => heandleLogout()}
            >
              <i className="fa fa-arrow-right-from-bracket"></i>
              Sign Out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
