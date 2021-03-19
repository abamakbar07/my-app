import React, { useContext, useEffect, useState } from 'react'
import { Container, Modal, Button } from 'react-bootstrap'
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

   const [loginModal, setLoginModal] = useState(false);
   const [registerModal, setRegisterModal] = useState(false);

   const handleClose = () => {
      setLoginModal(false);
      setRegisterModal(false);
      history.push("/dashboard")
   }

   const loginModalDisplay = () => {
      setLoginModal(true)
   }

   const registerModalDisplay = () => {
      setRegisterModal(true)
   }


   const closeModal = () => {
      dispatchModal({
         type: "CLOSE_MODAL"
      })
   }

   const [loginFormData, setLoginFormData] = useState({
      email: "",
      password: ""
   })

   const onChange = (e) => {
      setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value})
   }
   
   const login = async (e) => {
      e.preventDefault();
      try {
         const body = JSON.stringify({
            email: loginFormData.email,
            password: loginFormData.password
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
         dispatch({
            type: "LOGIN_FAILED"
         })
         setLoginModal(true)
      }
   }

  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const { email, password, fullname } = signupFormData;

  const onRegister = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email,
        password,
        fullname,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const user = await API.post("/register", body, config);

      setAuthToken(user.data.data.user.token);

      dispatch({
         type: "REGISTER_SUCCESS"
      })
      
    } catch (error) {
         console.log(error.response.data.message)
         dispatch({
            type: "REGISTER_FAILED",
            payload: {
               message: error.response.data.message
            }
         })
    }
  };

  const setLoginRequireModal = () => {
     dispatch({
        type: "SET_LOGIN_REQUIRE",
        payload: {
           loginRequire: false,
        }
     })
  }

   useEffect(() => { 
      if (!state.loading && state.user.isAdmin) {
         dispatch({
            type: "ADMIN_LOADED",
            payload: state.user
         })
         history.push('/admin/transaction')
      } else if (!state.loading && state.isLogin) {
         loginModalDisplay()
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

       <div
         className="LandingPage-dim"
         onClick={() => closeModal()}
         style={{
           display:
             stateModal.modalLogin || stateModal.modalRegister
               ? "block"
               : "none",
         }}
       ></div>

       <div
         className="Login card modalLoginRegister"
         style={{
           display: stateModal.modalLogin ? "block" : "none",
         }}
       >
         <Login
           statusLogin=""
           submit={(e) => login(e)}
           change={(e) => onChange(e)}
         />
       </div>

       <div
         className="Signup card modalLoginRegister"
         style={{
           display: stateModal.modalRegister ? "block" : "none",
         }}
       >
         <Register
           statusSignup={registerModalDisplay}
           submit={(e) => register(e)}
           change={(e) => onRegister(e)}
         />
       </div>

       <Modal show={loginModal} onHide={handleClose}>
         <Modal.Body
           className={state.loginStatus ? "text-success" : "text-danger"}
         >
           {state.loginStatus ? "Login succesfully!" : "Login Failed"}
         </Modal.Body>
         <Modal.Footer>
           <Button variant="primary" onClick={handleClose}>
             Ok
           </Button>
         </Modal.Footer>
       </Modal>

       <Modal show={registerModal} onHide={handleClose}>
         <Modal.Body
           className={state.registerStatus ? "text-success" : "text-danger"}
         >
           {state.registerStatus
             ? "Your email succesfully registered! Login now!"
             : `Register Failed! ${state.errorMessage}`}
         </Modal.Body>
         <Modal.Footer>
           <Button variant="primary" onClick={handleClose}>
             Ok
           </Button>
         </Modal.Footer>
       </Modal>

       <Modal show={state.loginRequire} onHide={setLoginRequireModal}>
         <Modal.Body className="text-danger">
           You must be to loggin first, please!
         </Modal.Body>
         <Modal.Footer>
           <Button
             className="globalButtonNoRound border-0"
             onClick={setLoginRequireModal}
           >
             Ok
           </Button>
         </Modal.Footer>
       </Modal>
     </Container>
   );
}

export default LandingPage
