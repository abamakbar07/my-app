import React from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Col, Row, Card } from 'react-bootstrap'

import BookDummy from '../../assets/bookImage.png'

const ListBooks = () => {
   const loading = false

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

{/* ==============================================================================                   */}
                  <Col sm="4">
                     <Link to="/book-detail/1">
                        <Card className=" bg-transparent border-0 pb-5">
                           <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                           <Card.Body className="text-left p-0 pt-2">
                              <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                                 Book Title
                              </Card.Title>
                              <Card.Text className="text-muted">
                                 Author
                              </Card.Text>
                           </Card.Body>
                        </Card>
                     </Link>
                  </Col>
                  <Col sm="4">

                     <Card className=" bg-transparent border-0 pb-5">
                        <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                              Book Title
                           </Card.Title>
                           <Card.Text className="text-muted">
                              Author
                           </Card.Text>
                        </Card.Body>
                     </Card>

                  </Col>
                  <Col sm="4">

                     <Card className=" bg-transparent border-0 pb-5">
                        <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                              Book Title
                           </Card.Title>
                           <Card.Text className="text-muted">
                              Author
                           </Card.Text>
                        </Card.Body>
                     </Card>

                  </Col>
                  <Col sm="4">

                     <Card className=" bg-transparent border-0 pb-5">
                        <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                              Book Title
                           </Card.Title>
                           <Card.Text className="text-muted">
                              Author
                           </Card.Text>
                        </Card.Body>
                     </Card>

                  </Col>
                  <Col sm="4">

                     <Card className=" bg-transparent border-0 pb-5">
                        <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                              Book Title
                           </Card.Title>
                           <Card.Text className="text-muted">
                              Author
                           </Card.Text>
                        </Card.Body>
                     </Card>

                  </Col>
                  <Col sm="4">

                     <Card className=" bg-transparent border-0 pb-5">
                        <Card.Img variant="top" src={BookDummy} style={{width: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                              Book Title
                           </Card.Title>
                           <Card.Text className="text-muted">
                              Author
                           </Card.Text>
                        </Card.Body>
                     </Card>

                  </Col>
{/* ============================================================================== */}

               </Row>
               // <Row>
               //    {book.map((bookList) => (
               //    <Col sm="4">

               //          <Link to={"/book/"+bookList.id}>
               //             <Card onClick={() => getbook(bookList.id)} className=" bg-transparent border-0 pb-5">
               //                <Card.Img variant="top" src={"http://localhost:5000/books/"+bookList.bookThumbnail} style={{width: "10vw", height: "30vh"}} />
               //                <Card.Body className="text-left p-0 pt-2">
               //                   <Card.Title className="ListBooks-title" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
               //                      {bookList.title}
               //                   </Card.Title>
               //                   <Card.Text className="text-muted">
               //                   {bookList.author}
               //                   </Card.Text>
               //                </Card.Body>
               //             </Card>
               //          </Link>

               //    </Col>
               //    ))}
               // </Row>
            )} 
      </div>
   )
}

export default ListBooks
