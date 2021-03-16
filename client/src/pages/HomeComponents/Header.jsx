import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const Header = () => {
   return (
      <div>
         <Jumbotron className="bg-transparent pd-0">
            <div style={{
               margin: "5vh 22vw"
            }}>
               <h3 style={{
                  fontFamily: "Vollkorn",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "43px",
                  lineHeight: "60px",
               }}>With us, you can shop online & help save your high street at the same time</h3>
            </div>
         </Jumbotron>
      </div>
   )
}

export default Header
