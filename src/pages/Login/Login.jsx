import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userLogin } from '../../services/API/userLogin'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, clearState } from '../../features/User/UserSlice'
import SpinLoader from '../../components/Loader/SpinLoader'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Local states
  const email = useRef()
  const password = useRef()
  const [isRememberMe, setIsRememberMe] = useState(true)
  // Grab user state (store)
  const { isFetching, token, isError, errorMessage, successMessage } =
    useSelector(userSelector)

  // Manage login form to authentificate user
  const heandleeSubmit = (e) => {
    e.preventDefault()
    const submitDatas = {
      email: email.current.value,
      password: password.current.value,
      isRememberMe: isRememberMe,
    }
    // Call api to login
    dispatch(userLogin(submitDatas))
  }

  // Manage feedback from api
  // To avoid Warning: Cannot update a component from inside the function body of a different component,
  // wrapp the setState call into useEffect.
  useEffect(() => {
    if (isError) {
      toast.error('Error : incorrect email or password', {
        position: 'top-center',
      })
      // console.log('errToast', errorMessage)
      dispatch(clearState())
    }
    if (token) {
      toast.success(successMessage, { position: 'top-center' })
      // Nav to auth user profile page
      navigate('/profile')
    }
    // eslint-disable-next-line
  }, [isError, token])

  return (
    <main className="main main-center bg-dark">
      {isFetching ? (
        <SpinLoader />
      ) : (
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form
            onSubmit={(e) => {
              heandleeSubmit(e)
            }}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={email}
                required={true}
                placeholder="youremail@xyz.com"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={password}
                required={true}
                placeholder="****************"
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                // Management of remember me option
                defaultChecked
                onClick={() => setIsRememberMe(!isRememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      )}
    </main>
  )
}
