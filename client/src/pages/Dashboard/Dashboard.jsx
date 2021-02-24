import React, { useContext } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { AppContext } from '../../components/context/GlobalContext'

const Dashboard = () => {
   const history = useHistory()
   const [state, dispatch] = useContext(AppContext)
   
   const admin = () => {
      console.log("aw")
      const result = {
         name: "nama",
         email: "email@gmail.com"
      }
      console.log(result)
      dispatch({
         type: "TEST_ADMIN",
         payload: result
      });
      history.push("/admin/transaction");
   }

   console.log(state.isAdmin)

   return (
      <div className="Container">
         <Row>
            <Button onClick={() => admin()}>
               Admin Route
            </Button>
            <Button>
               Private Route
            </Button>
         </Row>
      </div>
   )
}

export default Dashboard
