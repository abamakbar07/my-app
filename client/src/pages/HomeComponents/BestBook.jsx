import React, { useState, useEffect } from 'react'
import { Spinner, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { API } from '../../config/api'

const BestBook = () => {
   const [loading, setLoading] = useState(true)
   const [bestBook, setBestBook] = useState([])
   const [listBook, setListBook] = useState([])
   const [resultBestBook, setResultBestBook] = useState([])

   const getBestBook = async () => {
      try {
         setLoading(true)

         const resultBookBest = await API.get("/booktransactions")
         setBestBook(resultBookBest.data.data.bookTransaction)

         const resultBookList = await API.get("/books")
         setListBook(resultBookList.data.data.books)

         setLoading(false)      
      } catch (error) {
         console.log(error)

      }
   }

   if (!loading) {
      let i
      for ( i = 0; i < bestBook.length; i++ ) {
         resultBestBook[i] = bestBook[i].idBook.id
      }
      var counts = {}
      for ( var j = 0; j < resultBestBook.length; j++ ) {
         var num = resultBestBook[j];
           counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      var bestSelling = [];
      for (var best in counts) {
         bestSelling.push([best, counts[best]]);
      }

      bestSelling.sort(function(a, b) {
         return b[1] - a[1];
      });
   }
   

   useEffect(() => {
      getBestBook()
   }, [])

   return (
      <div>
      {loading ? (
         <div className="container text-center p-5 m-5">
               <Spinner animation="border" role="status"></Spinner>
         </div>
         ) : (
            <Row className="m-0">

               <Col sm="6">
                  <Link to={"/book-detail/"+listBook[bestSelling[0][0] -1].id}>
                     <Card className="border-0">
                        <Row>
                           <Col md="4">
                              <Card.Img src={"http://localhost:5000/books/"+listBook[bestSelling[0][0] -1].bookThumbnail} style={{display: "flex", maxWidth: "15vw"}} />
                           </Col>
                           <Col md="8" style={{color: "black"}}>
                              <Card.Body className="text-left">
                                 <Card.Title>{listBook[bestSelling[0][0] -1].title}</Card.Title>
                                 <Card.Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                                    {listBook[bestSelling[0][0] -1].about}
                                 </Card.Text>
                                 <Card.Text  className="text-success" 
                                             style={{
                                                fontFamily: "Avenir",
                                                fontStyle: "normal",
                                                fontWeight: "700"
                                             }}>
                                    {("Rp. "+listBook[bestSelling[0][0] -1].price)}
                                 </Card.Text>

                              </Card.Body>
                           </Col>
                        </Row>
                     </Card>
                  </Link>
               </Col>

               <Col sm="6">
                  <Link to={"/book-detail/"+listBook[bestSelling[1][0] -1].id}>
                     <Card className="border-0">
                        <Row>
                           <Col md="4">
                              <Card.Img src={"http://localhost:5000/books/"+listBook[bestSelling[1][0] -1].bookThumbnail} style={{display: "flex", maxWidth: "15vw"}} />
                           </Col>
                           <Col md="8" style={{color: "black"}}>
                              <Card.Body className="text-left">
                                 <Card.Title>{listBook[bestSelling[1][0] -1].title}</Card.Title>
                                 <Card.Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                                    {listBook[bestSelling[1][0] -1].about}
                                 </Card.Text>

                              </Card.Body>
                           </Col>
                        </Row>
                     </Card>
                  </Link>
               </Col>

            </Row>
         )}
      </div>
   )
}

export default BestBook
