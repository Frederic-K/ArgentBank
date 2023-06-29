import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from './features/User/UserSlice'
import { userProfile } from './services/API/userProfile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Error404 from './pages/404/Error404'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(userSelector)

  useEffect(() => {
    if (token !== null) {
      dispatch(userProfile({ token }))
    }
    // eslint-disable-next-line
  }, [])

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
