import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Button, Dropdown, Card } from 'react-bootstrap'

import logo from '../assets/logo.png'
import chart from '../assets/icon/chart.png'
import iconLogout from '../assets/icon/iconLogout.png'
import iconBook from '../assets/icon/addBookGrey.png'
import iconProfile from '../assets/icon/iconProfile.png'
import profileDefault from '../assets/profileDefault.jpg'
import { ModalContext } from './context/ModalContext'
import { AppContext } from './context/GlobalContext'

const NavigationBar = (props) => {
   const history = useHistory()
   const [stateModal, dispatchModal] = useContext(ModalContext)
   const [state, dispatch] = useContext(AppContext)
   const [pageAdmin, setPageAdmin] = useState(true)
   const [profilImage, setProfilImage] = useState(profileDefault)

   const [loading, setLoading] = useState(true)

   const changePageAdmin = () => {
      setPageAdmin(!pageAdmin)
   }

   const logout = () => {
      dispatch({
         type: "LOGOUT"
      })

      dispatchModal({
         type: "CLOSE_MODAL"
      })
   }

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
   console.log(profilImage)

   useEffect(() => {
      if (!state.user) {
         setProfilImage(profileDefault)
      } else {
         console.log(state.user)
         setProfilImage(
           "http://localhost:5000/profiles/" + props.user.profilImage
         );
      }
      console.log(state)
   }, [state])
   
   return (
      <div className="navBar">
         <Navbar className="justify-content-between bg-transparent pt-3">

            <div className="ml-5">
               <Link to={isAdmin ? "/admin/transaction" : "/"} >
                  <img alt="" src={logo} width="105px" style={{transform: "rotate(-15deg)"}} />
               </Link>
            </div>

            <div style={{display: isAdmin || isLogin ? "none" : "block"}}>
               <Button onClick={() => loginButton()} variant="light mr-4 rounded-0 border-dark">Login</Button>
               <Button onClick={() => registerButton()} variant="dark mr-4 rounded-0 border-light">Register</Button>
            </div>

            <div style={{display: isAdmin || isLogin ? "flex" : "none" }} className="mr-3">

               <Link to="/cart">
                  <div className={isAdmin ? "d-none" : "mt-3"}>
                     <img src={chart} alt="" />
                  </div>
               </Link>

               <Dropdown className="ml-3 mr-3">
                  <Dropdown.Toggle className="bg-transparent border-0">
                     <Card.Img   className="rounded-circle mr-3 ml-3" 
                                 src={profilImage} 
                                 style={{
                                    height: "50px", 
                                    width:"50px", 
                                    border: "3px solid black"
                                    }}
                                 />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                     <Dropdown.Item className="p-0">
                        <Link onClick={() => changePageAdmin()} to={isAdmin ? pageAdmin ? "/admin/add-book" : "/admin/transaction" : "/profile"} >
                           <div className="row container text-right"> {/* onClick={props.profile} */}
                              <div>
                                 <img alt="" className="ml-3 invert" width="25px" src={isAdmin ? iconBook : iconProfile} />
                              </div>
                              <p className="text-left m-0 p-0 text-secondary">{isAdmin ? pageAdmin ? "AddBook" : "Transaction" : "Profile"}</p>
                           </div>
                        </Link>
                     </Dropdown.Item>

                     <Dropdown.Divider />

                     <Dropdown.Item className="p-0">
                           <div className="row container text-right" onClick={() => logout()}>
                              <div>
                                 <img alt="" className="ml-3" src={iconLogout} />
                              </div>
                              <p className="text-left m-0 p-0 text-secondary">Logout</p>
                           </div>
                     </Dropdown.Item>

                  </Dropdown.Menu>
               </Dropdown>
            </div>

         </Navbar>
      </div>
   )
}

export default NavigationBar
