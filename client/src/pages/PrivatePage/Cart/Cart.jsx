import React, { useContext, useState } from 'react'
import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../../components/context/CartContext';
import { API } from '../../../config/api';

import iconTransaction from '../../../assets/uploadTransaction.png'

const Cart = () => {
   const history = useHistory()
   const [stateCart, dispatchCart] = useContext(CartContext);
   const { carts } = stateCart;

   const [preview, setPreview] = useState(false)
   const [previewImage, setPreviewImage] = useState({
      file : null,
   })

   let i
   let totalPrice = 0
   let bookTitle = []
   let bookId = []

   for (i = 0; i < carts.length; i++) {
      totalPrice += carts[i].price
      bookTitle[i] = carts[i].title
      bookId[i] = carts[i].id
   }

   const purchasedProduct = bookTitle.join(", ")

   const [loading, setLoading] = useState(false)
   const [addTransaction, setAddTransaction] = useState({
      users: localStorage.id,
      transferProof: "",
      productPurchased: purchasedProduct,
      paymentTotal: totalPrice,
      paymentStatus: "Pending",
   })   

   const { users, transferProof, productPurchased, paymentTotal, paymentStatus } = addTransaction

   const onChange = (e) => {
      console.log("change!")
      const updateTransaction = { ...addTransaction };
      updateTransaction[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setAddTransaction(updateTransaction)
      setPreviewImage({
         file: URL.createObjectURL(e.target.files[0])
      })
      setPreview(true)
   };

   const onSubmit = async (e) => {
      e.preventDefault()
      try {
         const form = new FormData();

         form.append("users", users);
         form.append("transferProof", transferProof);
         form.append("productPurchased", productPurchased);
         form.append("paymentTotal", paymentTotal);
         form.append("paymentStatus", paymentStatus);

         const config = {
            header: {
               "Content-Type": "multipart/form-data",
            },
         };

         const configBookTransaction = {
         headers: {
            "Content-Type": "application/json",
         },
         };

         setLoading(true);

         const transaction = await API.post("/transaction", form, config)

         const resultTransaction = transaction.data.data.transaction

         let j;
         for (j = 0; j < bookId.length; j++ ) {
            const body = JSON.stringify({
            idTransaction: resultTransaction.id,
            idBook: bookId[j]
            });
            const bodyResult = await API.post("/booktransaction", body, configBookTransaction)
            console.log(bodyResult.data.data)
         }

         setLoading(false)

         console.log(transaction.data.data.transaction)

         setAddTransaction({
            users: "",
            transferProof: "",
            productPurchased: purchasedProduct,
            paymentTotal: totalPrice,
            paymentStatus: "Pending",
         })

         history.push("/")
         
      } catch (error) {
         console.log(error)
      }
   }

   const removeProductFromCart = (id) => {
      dispatchCart({
         type: "REMOVE_CART",
         payload: {
         id,
         },
      });
   };
   
   return (
      <div>
         <div className="container pt-5">

            <div className="row container pt-5">
               <h1 className="col-sm-12 text-left">Cart</h1>
               <Col md="8">
                  <Card className="border-0 text-left bg-transparent">
                     <div className="pt-4">
                        <h5>Preview your order</h5>
                     </div>

                     <div className="border-top border-bottom mb-3 pt-3">
                        {carts.length > 0 ? (
                           carts.map((product) => (
                              <Card.Body>
                                 <Row className="container">
                                    <Col sm="4">
                                       <img src={"http://localhost:5000/books/"+product.bookThumbnail} style={{
                                          width: "10vw",
                                          height: "auto"
                                       }}/>
                                    </Col>
                                    <Col sm="6">
                                       <Card.Title>
                                          {product.title}
                                       </Card.Title>
                                       <Card.Text className="text-muted">
                                          {"By. "+product.author}
                                       </Card.Text>
                                       <Card.Text className="text-success font-weight-bold">
                                          {"Rp. "+product.price}
                                       </Card.Text>
                                    </Col>
                                    <Col sm="2" className="text-right">
                                       <a className="text-danger font-weight-bold border" 
                                          onClick={() => removeProductFromCart(product.id)}
                                          style={{
                                             borderColor: "red"
                                             }}
                                          >
                                          X
                                       </a>
                                    </Col>
                                 </Row>
                              </Card.Body>
                           ))
                        ) : (
                        <h1>Your Cart is Empty</h1>
                        )}
                     </div>
                  </Card>
               </Col>

               <Col md="4">
                  <Card className="border-0 bg-transparent">
                     <Card.Body className="border-bottom pb-5"></Card.Body>
                        <Row className="pr-1 pl-1 pt-1">
                           <Col sm="4" className="text-left">
                              Subtotal
                           </Col>
                           <Col sm="8" className="text-right">
                              {totalPrice}
                           </Col>
                        </Row>
                        <Row className="pr-1 pl-1">
                           <Col sm="4" className="text-left">
                              Qty
                           </Col>
                           <Col sm="8" className="text-right pb-1">
                              {carts.length}
                           </Col>
                        </Row>
                        <Row className="text-center">
                           <Col className="border"></Col>
                        </Row>
                        <Row className="pr-1 pl-1 text-success font-weight-bold">
                           <Col sm="4" className="text-left">
                              Total
                           </Col>
                           <Col sm="8" className="text-right pb-1">
                              {totalPrice}
                           </Col>
                        </Row>

                        <Row className="pt-5">
                           <Col sm="2">

                           </Col>
                           <Col sm="10">
                              <Form onSubmit={(e) => onSubmit(e)}>
                                 <Form.Group>
                                    <div className="">
                                       <label for="transferProof" className="">
                                          <h5>Upload bukti transfer</h5>
                                          <div className="">
                                             <img  className={preview ? "d-none" : ""} 
                                                   src={iconTransaction} 
                                                   style={{
                                                      width: "20vw"
                                                      }}
                                                   />
                                             <img  className={preview ? "" : "d-none"}
                                                   src={previewImage.file}
                                                   style={{
                                                      height: "25vh",
                                                      paddingBottom: "10px",
                                                      filter: "brightness(75%)"
                                                      }}
                                                   />
                                          </div>
                                       </label>
                                       {/* <input onChange={(e) => onChange(e)} name="bookFile" id="bookFile" type="file" style={{display:"none"}} /> */}
                                       <input onChange={(e) => onChange(e)} name="transferProof" id="transferProof" type="file" style={{display: "none"}} />
                                    </div>

                                    {/* <Form.Control className="d-none" name="paymentTotal" type="text" value={totalPrice} /> */}
                                    {/* <Form.Control className="d-none" name="qty" type="text" value={carts.length} /> */}
                                    {/* <Form.Control className="d-none" name="productPurchased" type="text" value={purchasedProduct} /> */}
                                    <Button block onSubmit={(e) => onSubmit(e)} type="submit" className="globalButton border-0">Pay</Button>
                                 </Form.Group>
                              </Form>
                           </Col>
                        </Row>
                  </Card>
               </Col>
            </div>

         </div>
      </div>
   )
}

export default Cart
