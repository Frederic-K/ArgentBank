import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import { userSelector } from './features/User/UserSlice'
import { userProfile } from './services/API/userProfile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Error404 from './pages/404/Error404'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {
  const dispatch = useDispatch()

  // Manage remember me option, if i reload homepge, still be login, but see in console that userProfile api is call 2 times ....
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')
      dispatch(userProfile({ token }))
    }
  }, [dispatch])

  // Test : try to fix userProfile call issue (double call isAuthentificated nd 2 api call)
  // if comment useEffet whos call userProfile in profil page, i avoid double auth status, but now get 3 call to userProfile api

  // const { token } = useSelector(userSelector)

  // useEffect(() => {
  //   if (localStorage.getItem('token') !== null) {
  //     const token = localStorage.getItem('token')
  //     dispatch(userProfile({ token }))
  //   } else {
  //     dispatch(userProfile({ token }))
  //   }
  //   // eslint-disable-next-line
  // }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
