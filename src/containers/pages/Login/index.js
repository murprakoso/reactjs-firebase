import React, { Component } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Button from '../../../components/atoms/Buttons';
import { loginUserAPI } from '../../../config/redux/action';



// class Login extends Component {
//     render() {
//         return (
//             <div>
//                 <p>Login Page {this.props.popupProps}</p>
//             </div>
//         )
//     }
// }

/** Stateless Component */
// const Login = (props) => {
class Login extends Component {

    // const[state, setState] = useState({ email: '', password: '' })
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        const { history } = this.props;
        const res = await this.props.loginAPI({ email, password }).catch(err => err)
        if (res) {
            console.log('Login success')
            console.log(res)
            this.setState({
                email: '',
                password: ''
            })
            history.push('/');
        } else {
            console.log('Login failed')
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
                                    <h2 className="text-secondary">Login Page</h2>
                                    <hr />
                                    <Form.Group >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleChangeText} value={this.state.email} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
                                    </Form.Group>
                                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login)
