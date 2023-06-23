import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginUser } from '../../utils/API/loginUser'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, clearState } from '../../features/UserSlice'
import SpinLoader from '../../components/Loader/SpinLoader'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const { isFetching, isAuthenticated, isError, errorMessage } =
    useSelector(userSelector)

  function handeleSubmit(event) {
    event.preventDefault()
    const submitDatas = {
      email: email.current.value,
      password: password.current.value,
    }
    dispatch(loginUser(submitDatas))
  }

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isError, isAuthenticated, errorMessage, dispatch, navigate])

  return (
    <main className="main bg-dark">
      {isFetching ? (
        <SpinLoader />
      ) : (
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handeleSubmit}>
            <div className="input-wrapper">
              <label for="username">Username</label>
              <input type="text" id="username" ref={email} required={true} />
            </div>
            <div className="input-wrapper">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                ref={password}
                required={true}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE -->
            <NavLink to="/profile" className="sign-in-button">
              Sign In
            </NavLink> */}
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      )}
    </main>
  )
}
