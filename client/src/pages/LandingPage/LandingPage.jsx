import React, { useContext } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { AppContext } from '../../components/context/GlobalContext'

const LandingPage = () => {
   const history = useHistory()
   const [state, dispatch] = useContext(AppContext)

   const result = {
      name: "nama",
      email: "email@gmail.com"
   }
   
   const admin = () => {
      dispatch({
         type: "ADMIN_LOGIN",
         payload: result
      });
      console.log("ADMIN LOGIN!")
      console.log(result)
      return history.push("/admin/transaction");
   }

   const user = () => {
      dispatch({
         type: "USER_LOGIN",
         payload: result
      });
      console.log("USER LOGIN!")
      console.log(result)
      return history.push("/dashboard");
   }

   return (
      <div className="Container">
         <Row>
            <Button onClick={() => admin()}>
               Admin Route
            </Button>
            <Button onClick={() => user()}>
               Private Route
            </Button>
         </Row>
      </div>
   )
}

export default LandingPage
