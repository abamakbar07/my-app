import React, { useEffect, useState} from 'react'
import { Dropdown, Table, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { API } from '../../../config/api'

const Transaction = () => {
   const history = useHistory()
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)

   const approveButton = async (id) => {
      try {
         const body = JSON.stringify({
            paymentStatus: "Approve"
         })
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         await API.patch("/transaction/"+id, body, config )

         setLoading(false)
         
         getTransaction()
         // history.push("/")
         
      } catch (error) {
         console.log(error)
      }
   }

   const cancelButton = async (id) => {
      try {
         const body = JSON.stringify({
            paymentStatus: "Cancel"
         })
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         await API.patch("/transaction/"+id, body, config )

         setLoading(false)
         
         getTransaction()
         // history.push("/")
         
      } catch (error) {
         console.log(error)
      }
   }

   const getTransaction = async () => {
      try {
         setLoading(true);
         const transactions = await API.get("/transactions");
         setLoading(false);
         setData(transactions.data.data.transactions);
      } catch (error) {
         console.log(error)
      }
   }

  useEffect(() => {
    getTransaction();
  }, []);

   return (
      <div className="pt-5">
         <div className="pt-5">
            <div className="container pl-5 pr-5"  style={{paddingTop: "5vh" }}>
               <div className="row">
                  <div className="col-md-12">
                     <div className="d-flex mb-5">
                        <h1 className="Admin-title text-left">Incoming Transaction</h1>
                        {/* <button className="ml-3" onClick={(e) => getTransaction(e)}>refresh</button> */}
                     </div>
                     <Table striped borderless hover className="bg-transparent">
                        <thead style={{
                           display: "block",
                        }}>
                           <tr className=" text-danger">
                              <th style={{width: "5vw"}}>No</th>
                              <th style={{width: "15vw"}}>Users</th>
                              <th style={{width: "10vw"}}>Evidence of Transfer</th>
                              <th style={{width: "25vw"}}>Product Purchased</th>
                              <th style={{width: "10vw"}}>Total Payment</th>
                              <th style={{width: "10vw"}}>Status Payment</th>
                              <th style={{width: "5vw"}}>Action</th>
                           </tr>
                        </thead>

                        {loading ? (
                              <div className="container text-center p-5 m-5">
                                 <Spinner animation="border" role="status"></Spinner>
                              </div>
                        ) : (
                           <tbody style={{
                           display: "block",
                           height: "50vh",
                           overflowY: "auto",
                           overflowX: "hidden"
                        }}>

                           {data.map((dataTrans, index) => (   
                              <tr className="" key={dataTrans.id}>
                                 <td style={{width: "5vw"}}>{index + 1}</td>
                                 <td style={{width: "15vw"}}>{dataTrans.users.fullname}</td>
                                 <td style={{width: "10vw"}}>{dataTrans.transferProof}</td>
                                 <td style={{width: "25vw"}}>{dataTrans.productPurchased.map((data) => (data.title)).join(" | ")}</td>
                                 <td style={{width: "10vw"}}>{"Rp."+dataTrans.paymentTotal}</td>
                                 <td style={{width: "10vw"}} className={
                                    dataTrans.paymentStatus === 'Approve' ? 'text-success': dataTrans.paymentStatus === 'Cancel' ? 'text-danger' : 'text-warning'
                                 } >{dataTrans.paymentStatus}</td>
                                 <td style={{width: "5vw"}}>
                                    <Dropdown>
                                       <Dropdown.Toggle variant="success" id="dropdown-basic">
                                          
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu>
                                          <Dropdown.Item onClick={() => approveButton(dataTrans.id)}>Approve</Dropdown.Item>
                                          <Dropdown.Item onClick={() => cancelButton(dataTrans.id)}>Cancel</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              ))}

                           </tbody>
                        )};
                     </Table>
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default Transaction
