import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { createContext, useEffect, useReducer, useState } from 'react'
import { db } from '../../firebase.config'
import { retreiveUserData } from '../../utils/firebase.utils'
const auth = getAuth()
const user = auth.currentUser

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser:null
})



export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  

  useEffect(() => {
    const getUserDetails =  onAuthStateChangedListener( async (user) => {
      if (user) {
       const {email, name, isAllowedEmailNotifications, isAllowedWebNotifications} =  await retreiveUserData(user)
       setCurrentUser({uid: user.uid, email, name, isAllowedEmailNotifications, isAllowedWebNotifications})
      }
    })
    return getUserDetails
  }, [])
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
