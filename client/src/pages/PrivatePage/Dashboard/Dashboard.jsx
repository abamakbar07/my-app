import React, {useContext, useEffect} from 'react'
import {Button} from 'react-bootstrap'
import { AppContext } from '../../../components/context/GlobalContext'

const Dashboard = () => {
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
         Dashboard
      </div>
   )
}

export default Dashboard
