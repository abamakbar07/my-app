import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { AppContext } from '../../components/context/GlobalContext'
import { API, setAuthToken } from '../../config/api';


const LandingPage = () => {
   const history = useHistory()
   const [state, dispatch] = useContext(AppContext)
   const [loginFormData, setLoginFormData] = useState({
      email: "",
      password: ""
   })

   const { email, password } = loginFormData;

   const onChange = (e) => {
      setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value})
   }
   
   const login = async (e) => {
      e.preventDefault();
      try {
         const body = JSON.stringify({
            email: email,
            password: password,
         })

         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         }

         const user = await API.post('/login', body, config)
         const userResult = user.data.data.user

         if (userResult.isAdmin) {
            dispatch({
               type: "ADMIN_LOGIN",
               payload: userResult
            })
            console.log("ADMIN LOGIN!")
            setAuthToken(userResult.token);
            console.log(userResult.token)
            history.push("/admin/transaction");
         } else {
            dispatch({
               type: "USER_LOGIN",
               payload: userResult
            });
            console.log("USER LOGIN!")
            history.push("/dashboard");
         }
         setAuthToken(userResult.token);
         
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      if (!state.loading && state.user.isAdmin) {
         dispatch({
            type: "ADMIN_LOADED",
            payload: state.user
         })
         history.push('/admin/transaction')
      } else if (!state.loading && state.isLogin) {
         history.push('/dashboard')
      }
   }, [state])

   return (
      <Container>
         <Row>
            <Col md="4"></Col>
            <Col md="auto">

               <Form className="mt-5" onSubmit={(e) => login(e)}>

                  <Form.Group>
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        // value={email}
                        onChange={(e) => onChange(e)}
                        require
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        // value={password}
                        onChange={(e) => onChange(e)}
                        require
                     />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                     Submit
                  </Button>

               </Form>

            </Col>
            <Col md="4"></Col>

                  {/* <Button variant="primary" type="submit" onClick={(e) => login(e)}>
                     Login
                  </Button> */}

         </Row>
      </Container>
   )
}

export default LandingPage
