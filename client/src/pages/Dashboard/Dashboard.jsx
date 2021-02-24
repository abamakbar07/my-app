import React, { useContext } from 'react'
import { Button, Row } from 'react-bootstrap'

import { AppContext } from '../../components/context/GlobalContext'

const Dashboard = () => {
   const [state, dispatch] = useContext(AppContext)

   const admin = () => {
      console.log("aw")
      const result = {
         name: "nama",
         email: "email@gmail.com"
      }
      console.log(result)
      return dispatch({
         type: "ADMIN",
         payload: result
      })
   }

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
