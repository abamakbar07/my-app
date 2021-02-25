import React from 'react'
import { Spinner, Row, Col, Card } from 'react-bootstrap'

import BookDummy from '../../assets/bookImage.png'

const BestBook = () => {
   const loading = false
   return (
      <div>
      {loading ? (
         <div className="container text-center p-5 m-5">
               <Spinner animation="border" role="status"></Spinner>
         </div>
         ) : (
      <Row className="m-0">
         <Col sm="6">
            <Card className="border-0">
               <Row>
                  <Col md="4">
                     <Card.Img src={BookDummy} style={{display: "flex", maxWidth: "15vw"}} />
                  </Col>
                  <Col md="8">
                     <Card.Body className="text-left">
                        <Card.Title>Title Book First</Card.Title>
                        <Card.Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                           About Book First
                        </Card.Text>

                     </Card.Body>
                  </Col>
               </Row>
            </Card>
         </Col>
         <Col sm="6">
            <Card className="border-0">
               <Row>
                  <Col md="4">
                     <Card.Img src={BookDummy} style={{display: "flex", maxWidth: "15vw"}} />
                  </Col>
                  <Col md="8">
                     <Card.Body className="text-left">
                        <Card.Title>Title Book Second</Card.Title>
                        <Card.Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                           About Book Second
                        </Card.Text>

                     </Card.Body>
                  </Col>
               </Row>
            </Card>
         </Col>
         
      </Row>
         )}
      </div>
   )
}

export default BestBook
