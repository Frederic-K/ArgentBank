import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import toaste from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, loginUser, clearState } from '../../Slices/UserSlice'

export default function Login() {
  const dispatch = useDispatch()
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector)

  function handeleSubmit(event) {
    event.preventDefault()
    dispatch(loginUser(data))
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label for="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          <NavLink to="/profile" className="sign-in-button">
            Sign In
          </NavLink>
          {/* <!-- SHOULD BE THE BUTTON BELOW -->
          <!-- <button className="sign-in-button">Sign In</button> -->
          <!--  --> */}
        </form>
      </section>
    </main>
  )
}
