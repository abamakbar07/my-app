import React, { useContext, useState } from 'react'
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { AppContext } from '../../../components/context/GlobalContext';

const ProfileListBooks = () => {
   const [state] = useContext(AppContext)
   const [loading, setLoading] = useState(false)
   const listBook = state.userBookList

   return (
     <div>
       <div className="ProfileListbooks pb-5">
         {loading ? (
           <div className="container text-center p-5 m-5">
             <Spinner animation="border" role="status"></Spinner>
           </div>
         ) : listBook.length < 1 ? (
           <div className="container text-center">
             You don't have a book to read yet. Buy now!
           </div>
         ) : (
           <Row>
             {listBook.map((book) => (
               <Col sm="2">
                 <a
                   href={
                     book.idTransaction.paymentStatus === "Approve"
                       ? "http://localhost:5000/books/" + book.idBook.bookFile
                       : ""
                   }
                  style={{pointerEvents: book.idTransaction.paymentStatus === "Approve" ? "" : "none"}}
                 >
                   {/* <Card onClick={() => getbook(bookList.id)} className=" bg-transparent border-0"> */}
                   <Card className=" bg-transparent border-0">
                     <Card.Img
                       variant="top"
                       src={
                         "http://localhost:5000/books/" +
                         book.idBook.bookThumbnail
                       }
                       style={{ width: "100%", height: "30vh" }}
                     />
                     <Card.Body className="text-left p-0 pt-2">
                       <Card.Title className="ListBooks-title">
                         {book.idBook.title}
                       </Card.Title>
                       <Card.Text className="text-muted">
                         {book.idBook.author}
                       </Card.Text>
                       <Button
                         className={
                           book.idTransaction.paymentStatus === "Pending"
                             ? "disabled globalButton border-0"
                             : book.idTransaction.paymentStatus === "Cancel" ? "disabled btn-danger" : "globalButton border-0"
                         }
                         style={{width: "100%"}}
                       >
                         {book.idTransaction.paymentStatus === "Pending"
                           ? "Transaction on process"
                           : book.idTransaction.paymentStatus === "Cancel" ? "Transaction failed" : "Download"}
                       </Button>
                     </Card.Body>
                   </Card>
                 </a>
               </Col>
             ))}
           </Row>
         )}
       </div>
     </div>
   );
}

export default ProfileListBooks
