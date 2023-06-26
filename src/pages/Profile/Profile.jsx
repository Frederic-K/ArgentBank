import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../features/User/UserSlice'
import { userProfile } from '../../services/API/userProfile'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import UserUpdateModal from '../../components/UserUpdateModal/UserUpdateModal'
import { userUpdate } from '../../services/API/userUpdate'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isModalShown, setIsModalShow } = useState(false)
  const newFirstname = useRef()
  const newLastname = useRef()
  const {
    token,
    isAuthenticated,
    firstname,
    lastname,
    isFetching,
    isError,
    errorMessage,
    successMessage,
  } = useSelector(userSelector)

  const handelOpenModal = () => {
    handelCloseModal()
    setIsModalShow(true)
  }

  const handelCloseModal = () => {
    setIsModalShow(false)
  }

  function handeleSubmit(e) {
    e.preventDefault()
    const submitDatas = {
      token: token,
      firstname: newFirstname.current.value,
      lastname: newLastname.current.value,
    }
    dispatch(userUpdate(submitDatas))
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login`)
    } else {
      dispatch(userProfile({ token }))
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <main className="main bg-dark">
      {isModalShown ? (
        <UserUpdateModal />
      ) : (
        <>
          <div className="header">
            <h1>
              Welcome back
              <br />
              {firstname} {lastname}
            </h1>
            <button className="edit-button" onClick={handelOpenModal}>
              Edit Name
            </button>
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
