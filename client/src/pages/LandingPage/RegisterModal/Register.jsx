import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ModalContext } from '../../../components/context/LoginRegisterContext'


const Register = (props) => {
   const submit = props.submit
   const change = props.change

   const [stateModal, dispatchModal] = useContext(ModalContext)

   const loginButton = () => {
      dispatchModal({
         type: "LOGIN_MODAL"
      })
   }

   return (

      <div className="card-body">
        <div className="container p-2">
          <Form onSubmit={submit}>
            
            <h2 className="mb-3 text-left font-weight-bold">Sign Up</h2>

            <Form.Group>
              <Form.Control className="bgTextbox mt-3" name="email" type="email" placeholder="Enter email" onChange={change} />

              <Form.Control className="bgTextbox mt-3" name="password" type="password" placeholder="Password" onChange={change} />

              <Form.Control className="bgTextbox mt-3 mb-3" name="fullname" type="fullname" placeholder="Full Name" onChange={change} />

              <div className="" onClick={props.statusSignup}>
                <Button className="mt-2 submit-button text-white" variant="" type="submit" onClick={props.rtn} style={{
                  width: "100%",
                  background: "#393939"
                }}>
                  Register
                </Button>
              </div>
            </Form.Group>

            <Form.Text className="text-muted">
              Already have an account? Klik <a className="font-weight-bold text-dark" onClick={() => loginButton()} href="/#">Here</a>
            </Form.Text>    
            {/* <Form.Text className="text-muted">
              <pre>{JSON.stringify(signupFormData, null, 2)}</pre>
            </Form.Text>         */}

          </Form>
        </div>
      </div>

   )
}

export default Register
