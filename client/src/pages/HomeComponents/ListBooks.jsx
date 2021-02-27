import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Col, Row, Card } from 'react-bootstrap'

import { API } from '../../config/api'

const ListBooks = () => {
   const [loading, setLoading] = useState(true)
   const [book, setBook] = useState([])

   const setListBook = async () => {
      try {
         setLoading(true);
         const books = await API.get("/books");
         setLoading(false);
         setBook(books.data.data.books);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      setListBook();
   }, []);

   return (
      <div className="container pt-5">
         <div>
            <h4 className="MainContent-subTitle text-left m-3 font-weight-bold">List Book</h4>
         </div>
      {loading ? (
         <div className="container text-center p-5 m-5">
            <Spinner animation="border" role="status"></Spinner>
         </div>
         ) : (
            <Row>
               {book.map((bookList) => (
               <Col sm="4">

                     <Link to={"/book-detail/"+bookList.id}>
                        <Card className=" bg-transparent border-0 pb-5">
                           <Card.Img variant="top" src={"http://localhost:5000/books/"+bookList.bookThumbnail} style={{width: "10vw", height: "30vh"}} />
                           <Card.Body className="text-left p-0 pt-2">
                              <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                                 {bookList.title}
                              </Card.Title>
                              <Card.Text className="text-muted">
                              {bookList.author}
                              </Card.Text>
                           </Card.Body>
                        </Card>
                     </Link>

               </Col>
               ))}
            </Row>
            )} 
      </div>
   )
}

export default ListBooks
