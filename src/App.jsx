import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Signin />} />
        <Route path="/profile" element={<User />} />
        <Route path="*" element={<Error404 />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
