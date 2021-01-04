import React, { Component } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Buttons';
import { registerUserAPI } from '../../../config/redux/action';


/** Functional Componenet */
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

    handleRegisterSubmit = async () => {
        const { email, password } = this.state;
        const res = await this.props.registerAPI({ email, password }).catch(err => err)
        if (res) {
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center mt-5">
                        <Col md="5">
                            <Card>
                                <Card.Body>
                                    <h2 className="text-secondary">Register Page</h2>
                                    <hr />
                                    <Form.Group >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleChangeText} value={this.state.email} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
                                    </Form.Group>

                                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(Register)
