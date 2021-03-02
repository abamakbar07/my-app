import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';

import { API } from '../../../config/api'

const ProfileListBooks = (props) => {
   const [loading, setLoading] = useState(false)
   const [listBook, setListBook] = useState([])

   function sleep(ms) {
      return new Promise((resolve) => {
         setTimeout(resolve, ms);
      });
   }

   console.log(props.listBook)

   const getBookTransactionUser = async () => {
      try {
         setLoading(true);
         setListBook(props.listBook)
         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getBookTransactionUser()
   }, [])

   return (
      <div>
         <div className="ProfileListbooks pb-5">
            {loading ? (
                  <div className="container text-center p-5 m-5">
                     <Spinner animation="border" role="status"></Spinner>
                  </div>
               ) : listBook.length < 1 ?  ( 
                  <div className="container text-center">
                     Anda belum memilih buku
                  </div> ) : (
               <Row>
                  {listBook.map((bookTransaction) => (
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
