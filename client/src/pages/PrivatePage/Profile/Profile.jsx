import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../components/context/GlobalContext'
import { API } from '../../../config/api'
import ProfileDetail from './ProfileDetail'
import ProfileListBooks from './ProfileListBooks'

const Profile = () => {

   return (
      <div className="container">
         <div className="Profile">
            <div className="container">
               <div className="row mt-5">
                  <div className="col-12">
                     <img className="MainContent-header" src="" alt="" />
                     <h4 className="MainContent-subTitle text-left mb-3 font-weight-bold">Profile</h4>
                     <div className="row">
                        <ProfileDetail />
                     </div>
                     <h4 className="MainContent-subTitle text-left font-weight-bold" style={{marginTop: '68px'}}>My List Book</h4>
                     {/* <div className="row"> */}
                        {/* <ProfileListBooks idTransaction={props.idTransaction} /> */}
                        <ProfileListBooks />
                     {/* </div> */}
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default Profile
