import React, {useContext, useEffect} from 'react'
import {Button, Container, Jumbotron} from 'react-bootstrap'
import { AppContext } from '../../../components/context/GlobalContext'
import BestBook from '../../HomeComponents/BestBook'
import Header from '../../HomeComponents/Header'
import ListBooks from '../../HomeComponents/ListBooks'

const Dashboard = () => {

   return (
      <Container fluid>
         
         <Header />

         <BestBook />

         <ListBooks />

      </Container>
   )
}

export default Dashboard
