import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ModalContext } from '../../../components/context/ModalContext'


const Login = (props) => {
   const submit = props.submit
   const change = props.change

   const [stateModal, dispatchModal] = useContext(ModalContext)

   const registerButton = () => {
      dispatchModal({
         type: "REGISTER_MODAL"
      })
   }

   return (
      <div className="card-body">
        <div className="container p-2">
          <Form onSubmit={submit}>
            
            <h2 className="mb-3 text-left font-weight-bold">Login</h2>

            <Form.Group>
              <Form.Control className="bgTextbox mb-3" name="email" type="email" placeholder="Enter email" onChange={change} />

              <Form.Control className="bgTextbox mb-3" name="password" type="password" placeholder="Password" onChange={change} />

                <div className="" onClick={props.statusLogin}>
                  <Button onClick={props.rtn} className="mt-2 submit-button globalButtonNoRound" variant="" type="submit" style={{
                    width: "100%"
                  }}>
                    Login
                  </Button>
                </div>
            </Form.Group>

            <Form.Text className="text-muted">
              Don't have an account? Klik <a className="font-weight-bold text-dark" onClick={() => registerButton()} href="/#" >Here</a>
              {/* Don't have an account? Klik <a className="font-weight-bold text-dark" href="/#" >Here</a> */}
            </Form.Text>            
            {/* <Form.Text className="text-muted">
              <pre>{JSON.stringify(loginFormData, null, 2)}</pre>
            </Form.Text> */}

          </Form>
        </div>
      </div>

   )
}

export default Login
