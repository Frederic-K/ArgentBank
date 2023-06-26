// import React, { useState, useEffect } from 'react'
import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
// import SpinLoader from '../../components/Loader/SpinLoader'

export default function Home() {
  // const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  // }, [])

  // return (
  //   <main>
  //     {isLoading ? (
  //       <SpinLoader />
  //     ) : (
  //       <>
  //         <Hero />
  //         <Features />
  //       </>
  //     )}
  //   </main>
  // )
  return (
    <main className="main">
      <Hero />
      <Features />
    </main>
  )
}
