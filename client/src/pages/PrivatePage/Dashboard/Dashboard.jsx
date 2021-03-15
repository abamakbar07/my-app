import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AppContext } from '../../../components/context/GlobalContext'
import { API } from '../../../config/api'

import BestBook from '../../HomeComponents/BestBook'
import Header from '../../HomeComponents/Header'
import ListBooks from '../../HomeComponents/ListBooks'

const Dashboard = () => {
   const [state, dispatch] = useContext(AppContext)
   const [loading, setLoading] = useState(true);
   const [run, setRun] = useState()

   const touch = () => {
      console.log(state.userTransaction);
   }

   const getTransactionUser = async () => {
     try {
       setLoading(true);

       const resultTransaction = await API.get("/transaction/" + state.user.id)
       const result = resultTransaction.data.data.transaction.id
       dispatch({
         type: "GET_TRANSACTION",
         payload: {
           userTransaction: result,
         },
       });
       setLoading(false);
       setRun("Run")
     } catch (error) {
       console.log(error);
     }
   };

   const getUserBookList = async () => {
      try {
         setLoading(true);

         const resultBookTransaction = await API.get(
         "/booktransaction/" + state.userTransaction
         );
         const userBookList = resultBookTransaction.data.data.bookTransaction;
         console.log(userBookList)
         dispatch({
         type: "SET_USER_BOOKLIST",
         payload: {
            userBookList,
         }   
         });

         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
     getTransactionUser();
   }, []);

   useEffect(() => {
     getUserBookList();
   }, [run])

   return (
     <Container fluid>
       <Header />

       <BestBook />

       <ListBooks />
     </Container>
   );
}

export default Dashboard
