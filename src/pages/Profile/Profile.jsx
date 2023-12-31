import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, update } from '../../features/User/UserSlice'
import { userProfile } from '../../services/API/userProfile'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userUpdate } from '../../services/API/userUpdate'
import SpinLoader from '../../components/Loader/SpinLoader'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Local states
  const [isModalShown, setIsModalShow] = useState(false)
  const newFirstname = useRef()
  const newLastname = useRef()

  // Grab user's states (store)
  const {
    email,
    token,
    isUpdated,
    firstName,
    lastName,
    isFetching,
    isError,
    errorMessage,
    successMessage,
  } = useSelector(userSelector)

  // Manage opening the form to update user's names
  const handleOpenModal = () => {
    // Ensure that the form is closed
    handleCloseModal()
    // Manage form's local state
    setIsModalShow(true)
  }

  const handleCloseModal = () => {
    setIsModalShow(false)
  }

  // Manage form to update user's names
  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    const submitUpdateDatas = {
      token: token,
      firstName: newFirstname.current.value,
      lastName: newLastname.current.value,
    }
    // Call api to update user's names
    dispatch(userUpdate(submitUpdateDatas))
    // Close form if required fields isnt empty
    handleCloseModal()
  }

  // Manage call api feedback : post method to grab user infos, nd put method to update user's names
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, { position: 'top-center' })
      // console.log('errToast', errorMessage)
    } else if (isUpdated) {
      // Manage updating firstname nd lastname state
      toast.success(successMessage, { position: 'top-center' })
      dispatch(update())
    } else if (!token) {
      navigate(`/`)
    } else if (email === '') {
      // Set condition to avoid useless api call
      dispatch(userProfile({ token }))
    }
    // eslint-disable-next-line
  }, [isError, isUpdated, token])

  return (
    <main className="main bg-dark">
      {isModalShown ? (
        <div className="update-profile-wrapper">
          <section className="update-profile-content">
            <i className="fa fa-user-circle update-profile-icon"></i>
            <h1>Update Profile</h1>
            <form
              onSubmit={(e) => {
                handleUpdateSubmit(e)
              }}
            >
              <div className="input-update-profile-wrapper">
                <label htmlFor="newFirstname">New firstname</label>
                <input
                  type="text"
                  id="newFirstname"
                  ref={newFirstname}
                  required={true}
                  placeholder="new firstname"
                />
              </div>
              <div className="input-update-profile-wrapper">
                <label htmlFor="newLastname">New lastname</label>
                <input
                  type="text"
                  id="newLastname"
                  ref={newLastname}
                  required={true}
                  placeholder="new lastname"
                />
              </div>
              <div className="update-profile-button-wrapper">
                <button className="update-profile-button">Update</button>
                <button
                  type="button"
                  className="update-profile-button"
                  onClick={() => {
                    handleCloseModal()
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : isFetching ? (
        <SpinLoader />
      ) : (
        <>
          <div className="header">
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}
            </h1>
            <button className="edit-button" onClick={() => handleOpenModal()}>
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
