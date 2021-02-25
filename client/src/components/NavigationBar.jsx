import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button, Dropdown, Card } from 'react-bootstrap'

import logo from '../assets/logo.png'
import chart from '../assets/icon/chart.png'
import iconLogout from '../assets/icon/iconLogout.png'
import iconBook from '../assets/icon/addBookGrey.png'
import profileDefault from '../assets/profileDefault.jpg'
import { ModalContext } from './context/LoginRegisterContext'

// import { AppContext } from './context/GlobalContext'

const NavigationBar = (props) => {
   const [stateModal, dispatchModal] = useContext(ModalContext)

   const loginButton = () => {
      dispatchModal({
         type: "LOGIN_MODAL"
      })
   }

   const registerButton = () => {
      dispatchModal({
         type: "REGISTER_MODAL"
      })
   }

   const isAdmin = props.isAdmin
   const isLogin = props.isLogin

   return (
      <div>
         <Navbar className="justify-content-between bg-transparent pt-3">
            {/* <Link to={isAdmin ? "/admin/transaction" : "/"} > */}
               <img className="ml-3" alt="" src={logo} width="105px" style={{transform: "rotate(-15deg)"}} />
            {/* </Link> */}

            <div style={{display: "block"}}>
               <Button onClick={() => loginButton()} variant="light mr-4 rounded-0 border-dark">Login</Button>
               <Button onClick={() => registerButton()} variant="dark mr-4 rounded-0 border-light">Register</Button>
            </div>

            <div className="block d-flex mr-3">

               <Link to="/cart">
                  <div className="mt-3">
                     <img src={chart} alt="" />
                  </div>
               </Link>

               <Dropdown className="ml-3 mr-3">
                  <Dropdown.Toggle className="bg-transparent border-0">
                     <Card.Img className="rounded-circle mr-3 ml-3" src={profileDefault} style={{height: "50px", width:"50px", border: "3px solid black"}} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                     <Dropdown.Item className="p-0">
                        <div className="row container text-right"> {/* onClick={props.profile} */}
                           <div className="">
                              <img alt="" className="ml-3 invert" width="25px" src={iconBook} />
                           </div>
                           <p className="text-left m-0 p-0 text-secondary">Profile</p>
                        </div>
                     </Dropdown.Item>

                     <Dropdown.Divider />

                     <Dropdown.Item className="p-0">
                        <Link to="/" >
                           <div className="row container text-right">
                              <div className="">
                                 <img alt="" className="ml-3" src={iconLogout} />
                              </div>
                              <p className="text-left m-0 p-0 text-secondary">Logout</p>
                           </div>
                        </Link>
                     </Dropdown.Item>

                  </Dropdown.Menu>
               </Dropdown>
            </div>

         </Navbar>
      </div>
   )
}

export default NavigationBar
