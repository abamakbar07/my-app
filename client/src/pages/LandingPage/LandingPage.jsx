import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { AppContext } from '../../components/context/GlobalContext'
import { ModalContext } from '../../components/context/ModalContext';
import { API, setAuthToken } from '../../config/api';
import BestBook from '../HomeComponents/BestBook';
import Header from '../HomeComponents/Header';
import ListBooks from '../HomeComponents/ListBooks';
import Login from './LoginModal/Login';
import Register from './RegisterModal/Register';


const LandingPage = () => {
   const history = useHistory()
   const [state, dispatch] = useContext(AppContext)
   const [stateModal, dispatchModal] = useContext(ModalContext)

   const closeModal = () => {
      dispatchModal({
         type: "CLOSE_MODAL"
      })
   }

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
            setAuthToken(userResult.token);
            console.log(userResult.token)
            history.push("/admin/transaction");
         } else {
            dispatch({
               type: "USER_LOGIN",
               payload: userResult
            });
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
      <Container fluid>
         <div>
            <Header />
            <BestBook />
            <ListBooks />
         </div>

         <div className="LandingPage-dim" onClick={() => closeModal()} style={{display: stateModal.modalLogin || stateModal.modalRegister ? 'block' : 'none' }}></div>

         <div className="Login card" style={{display: stateModal.modalLogin ? 'block' : 'none'}} >
            <Login submit={(e) => login(e)} change={(e) => onChange(e)} />
         </div>

         <div className="Signup card" style={{display: stateModal.modalRegister ? 'block' : 'none'}} >
            {/* <Register submit={(e) => register(e)} change={(e) => onRegister(e)} /> */}
            <Register submit="submit" change="change" />
         </div>


      </Container>
   )
}

export default LandingPage
