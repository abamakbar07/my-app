import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../components/context/GlobalContext'
import { API } from '../../../config/api'
import ProfileDetail from './ProfileDetail'
import ProfileListBooks from './ProfileListBooks'

const Profile = (props) => {
   const [state] = useContext(AppContext)
   const [loading, setLoading] = useState(true)
   const [data, setData] = useState(false)
   const [listBook, setListBook] = useState([])
   const [idTransaction, setIdTransaction] = useState()

   function sleep(ms) {
      return new Promise((resolve) => {
         setTimeout(resolve, ms);
      });
   }

   const getTransactionUser = async () => {
      try {
         setLoading(true)

         const resultTransaction = await API.get("/transaction/"+state.user.id)
         setIdTransaction(resultTransaction.data.data.transaction.id)
         sleep(3000)
         const resultBookTransaction = await API.get("/booktransaction/"+props.idTransaction);
         setListBook(resultBookTransaction.data.data.bookTransaction);

         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getTransactionUser()
   }, [])

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
                        <ProfileListBooks idTransaction={idTransaction} listBook={listBook} />
                     {/* </div> */}
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default Profile
