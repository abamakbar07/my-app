import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';

import { API } from '../../../config/api'

const ProfileListBooks = () => {
   const [loading, setLoading] = useState(true)
   const [paymentStatus, setPaymentStatus] = useState()
   const [listBook, setListBook] = useState([])

   const [listBookTransaction, setListBookTransaction] = useState([])

   const [listTransaction, setListTransaction] = useState([])

   const getTransactionUser = async () => {

      try {
         const resultTransaction = await API.get("/transaction/19")
         setListTransaction(resultTransaction.data.data.transaction)
      } catch (error) {
         console.log(error)
      }
   }

   const getData = async () => {
      try {
         setLoading(true)

         const resultBook = await API.get("/books")
         setListBook(resultBook.data.data.books)
         
         const resultBookTransaction = await API.get("/booktransaction/"+listTransaction.id)
         setListBookTransaction(resultBookTransaction.data.data.bookTransaction)
         
         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getTransactionUser()
      getData()
   }, [])

   return (
      <div>
         <div className="ProfileListbooks pb-5">
            {loading ? (
               <div className="container text-center">
                  Anda belum memilih buku
               </div>
               ) : listBookTransaction.length < 1 ?  ( 
               <div className="container text-center">
                  Anda belum memilih buku
               </div> ) : (
                  <Row>
                     {listBookTransaction.map((bookTransaction) => (
                     <Col sm="4">

                           <a href={bookTransaction.idTransaction.paymentStatus === "Approve" ? "http://localhost:5000/books/"+bookTransaction.idBook.bookFile : ""}>
                              {/* <Card onClick={() => getbook(bookList.id)} className=" bg-transparent border-0"> */}
                              <Card className=" bg-transparent border-0">
                                 <Card.Img variant="top" src={"http://localhost:5000/books/"+bookTransaction.idBook.bookThumbnail} style={{width: "10vw", height: "30vh"}} />
                                 <Card.Body className="text-left p-0 pt-2">
                                    <Card.Title className="ListBooks-title" >
                                       {bookTransaction.idBook.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted">
                                       {bookTransaction.idBook.author}
                                    </Card.Text>
                                    <Button className={bookTransaction.idTransaction.paymentStatus === "Pending" ? "disabled" : ""}>
                                       {bookTransaction.idTransaction.paymentStatus === "Pending" ? "Transaction on process" : "Download" }
                                    </Button>
                                 </Card.Body>
                              </Card>
                           </a>

                     </Col>
                     )
                  )}
                  </Row>
               )}
         </div>
      </div>
   )
}

export default ProfileListBooks
