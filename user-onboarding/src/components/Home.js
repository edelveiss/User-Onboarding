import React, { useState, useEffect } from "react";
//import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, CardText, CardBody } from "reactstrap";

function Home(props) {
  console.log("users", props.users);
  return (
    <Container style={{ width: "70%" }}>
      <Row>
        <Col>
          {props.users.map((user) => {
            return (
              <Container key={user.id}>
                <Card style={{ background: "#408BFA", marginTop: "1rem" }}>
                  <CardBody style={{ color: "white" }}>
                    <CardText
                      style={{ fontSize: " 1.3rem", fontWeight: "bolder" }}
                    >
                      {user.name}
                    </CardText>
                    <CardText>{user.email}</CardText>
                  </CardBody>
                </Card>
              </Container>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
