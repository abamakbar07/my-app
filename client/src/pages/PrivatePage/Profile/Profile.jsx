import React from 'react'
import ProfileDetail from './ProfileDetail'
import ProfileListBooks from './ProfileListBooks'

const Profile = (props) => {
   return (
      <div>
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
                        {/* <ProfileListBooks listTransaction={props.listTransaction} /> */}
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
