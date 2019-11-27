import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, 
  Card, 
  CardBody,
  CardFooter,
  Col,
  Container, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Modal,
  Row } from 'reactstrap';

class ForgotPassword extends Component {
  render() {

    console.log(REACT_TEST_STRING);

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Reset Password</h1>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <Button color="success" block>Reset Password</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Link to="/">
                    <Button color="secondary" className="px-4">login page</Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </Container>

      </div>
    );
  }
}

export default ForgotPassword;
