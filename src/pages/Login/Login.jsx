import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userLogin } from '../../services/API/userLogin'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, clearState } from '../../features/User/UserSlice'
import SpinLoader from '../../components/Loader/SpinLoader'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const { isFetching, isAuthenticated, isError, errorMessage, successMessage } =
    useSelector(userSelector)

  function handeleSubmit(e) {
    e.preventDefault()
    const submitDatas = {
      email: email.current.value,
      password: password.current.value,
    }
    dispatch(userLogin(submitDatas))
  }

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, { position: 'top-center' })
      console.log('errToast', errorMessage)
      dispatch(clearState())
    }
    if (isAuthenticated) {
      toast.success(successMessage, { position: 'top-center' })
      navigate('/profile')
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isError])

  return (
    <main className="main main-center bg-dark">
      {isFetching ? (
        <SpinLoader />
      ) : (
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handeleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={email}
                required={true}
                placeholder="email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={password}
                required={true}
                placeholder="password"
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      )}
    </main>
  )
}
