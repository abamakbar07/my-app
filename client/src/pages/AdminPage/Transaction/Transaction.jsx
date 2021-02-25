import React, {useContext, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import { AppContext } from '../../../components/context/GlobalContext'

const Transaction = () => {
   const [state, dispatch] = useContext(AppContext)

   const logout = () => {
      dispatch({
         type: "LOGOUT"
      })
   }

   useEffect(() => {
      logout()
   }, [])

   return (
      <div className="text-center">
         <Button className="d-block" onClick={() => logout()}>
            Logout
         </Button>
         Admin Transaction
      </div>
   )
}

export default Transaction
