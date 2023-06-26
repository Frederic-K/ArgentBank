import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../features/User/UserSlice'
import { userUpdate } from '../../services/API/userUpdate'

export default function UserUpdateModal() {
  const dispatch = useDispatch()
  const firstname = useRef()
  const lastname = useRef()

  const { isFetching, isError, errorMessage, successMessage, token } =
    useSelector(userSelector)

  function handeleSubmit(e) {
    e.preventDefault()
    const submitDatas = {
      token: token,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
    }
    dispatch(userUpdate(submitDatas))
  }
  return
}
