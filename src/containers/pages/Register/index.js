import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import firebase from '../../../config/firebase';

class Register extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = () => {
        // console.log(this.state.email);
        // console.log(this.state.password);
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                // Signed in
                console.log('success: ', res);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    }

    render() {

        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center mt-5">
                        <Col md="5">
                            <Card>
                                <Card.Body>
                                    <Form className="mb-2">
                                        <h2 className="text-secondary">Register Page</h2>
                                        <hr />
                                        <Form.Group >
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleChangeText} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChangeText} />
                                        </Form.Group>
                                        <Button variant="primary" onClick={this.handleRegisterSubmit} className="col md-auto">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div >
        )
    }
}

export default Register
