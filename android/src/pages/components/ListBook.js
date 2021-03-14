import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container } from 'native-base'
import { Grid, Col, Row } from "react-native-easy-grid";

const ListBook = () => {
   return (
      <Container>
         <View>
            <Text>ListBook</Text>
         </View>
         <Grid style={{padding: 20}}>
            <Row style={{height: 300}}>
               <Col style={{backgroundColor: "red",width: "33.3%"}}>
                  <Text>
                     Book1
                  </Text>
               </Col>
               <Col style={{backgroundColor: "yellow",width: "33.3%"}}>
                  <Text>
                     Book2
                  </Text>
               </Col>
               <Col style={{backgroundColor: "green",width: "33.3%"}}>
                  <Text>
                     Book3
                  </Text>
               </Col>
            </Row>
            <Row>
               <Col style={{backgroundColor: "green",width: "33.3%"}}>
                  <Text>
                     Book1
                  </Text>
               </Col>
               <Col style={{backgroundColor: "red",width: "33.3%"}}>
                  <Text>
                     Book2
                  </Text>
               </Col>
               <Col style={{backgroundColor: "yellow",width: "33.3%"}}>
                  <Text>
                     Book3
                  </Text>
               </Col>
            </Row>
            <Row>
               <Col style={{backgroundColor: "yellow",width: "33.3%"}}>
                  <Text>
                     Book1
                  </Text>
               </Col>
               <Col style={{backgroundColor: "green",width: "33.3%"}}>
                  <Text>
                     Book2
                  </Text>
               </Col>
               <Col style={{backgroundColor: "red",width: "33.3%"}}>
                  <Text>
                     Book3
                  </Text>
               </Col>
            </Row>
         </Grid>
      </Container>
   )
}

export default ListBook

const styles = StyleSheet.create({})
