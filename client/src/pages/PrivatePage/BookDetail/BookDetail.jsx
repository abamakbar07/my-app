import React, { useContext, useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

import { CartContext } from '../../../components/context/CartContext'

import iconBookmark from '../../../assets/icon/bookmark.png'
import { API } from '../../../config/api'

const BookDetail = () => {
   const { id } = useParams()
   const [stateCart, dispatchCart] = useContext(CartContext)
   const { carts } = stateCart
   
   const [loading, setLoading] = useState(false)
   const [bookResult, setBookResult] = useState([])
   const [booksResult, setBooksResult] = useState([])
   const [addCart, setAddCart] = useState(true)

   const getAddCart = () => {
      setLoading(false)
      let i
      for (i=0; i < carts.length; i++) {
         if (carts[i].id === id) setAddCart(false)
      }
      setLoading(true)
   }

   const getBook = async () => {
      try {
         setLoading(true);
         const book = await API.get("/book/"+id);
         const books = await API.get("/books")
         setBookResult(book.data.data.book);
         setBooksResult(books.data.data.books);
         
         setLoading(false);

      } catch (error) {
         console.log(error)
      }
   }

   const addProductToCart = async (id) => {
      try {
         setLoading(true)
         const product = booksResult.find((product) => product.id === id);
         dispatchCart({
            type: "ADD_CART",
            payload: product,
         });
         setLoading(false)
      } catch (error) {
         console.log("error add product to cart")   
      }
   };

   useEffect(() => {
      getBook();
      getAddCart();
   }, []);

   return (
      <div>
      {loading ? (
         <h1>Loading dulu gaes</h1>
      ) : ( 
         <Card body className="border-0 bg-transparent" style={{zIndex: "1"}}>
            <div className="row">
               <div className="col-md-4">
                  <ListGroup>
                     <img alt="" src={"http://localhost:5000/books/"+bookResult.bookThumbnail} style={{width: "100%"}} />
                  </ListGroup>
               </div>

               <div className="col-md-8">
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="BookDetail-title m-0 font-weight-bold">
                           {bookResult.title}
                        </p>
                        <small className="text-muted">
                           {bookResult.author}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent mt-3">
                        <p className="m-0 font-weight-bold">
                           Publication date
                        </p>
                        <small className="text-muted">
                           {bookResult.publicationDate}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           Pages
                        </p>
                        <small className="text-muted">
                           {bookResult.pages}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold text-danger">
                           ISBN
                        </p>
                        <small className="text-muted">
                           {bookResult.isbn}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold text-success">
                           Price
                        </p>
                        <small className="text-muted">
                           {"Rp. "+bookResult.price}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
               </div>
            </div>

            <div className="row mt-5 mb-5">
               <div className="col-sm-12">
                  <p className="BookDetail-aboutTitle text-left">About This Book</p>
                  <p className="BookDetail-aboutSub text-left">
                     {bookResult.about}
                  </p>
               </div>
            </div>

            <div className={loading ? "d-false" : "row"}>
               <div className="col-sm-12 text-right">
                  <Link to="/cart" className={addCart ? "" : "d-none"}>
                     <button onClick={() => addProductToCart(bookResult.id)} className="btn globalButtonNoRound m-1">Add To Cart<img alt="" className="ml-2" src={iconBookmark} /></button>
                     {/* <button className="btn btn-danger m-1">Add To Cart<img alt="" className="ml-2" src={iconBookmark} /></button> */}
                  </Link>
                  <Link className={addCart ? "d-none" : ""}>
                     <button className="btn btn-light m-1" style={{background: "rgba(205, 205, 205, 0.7)"}}>Book Added</button>
                  </Link>
               </div>
            </div>
         </Card>
      )}
      </div>
   )
}

export default BookDetail