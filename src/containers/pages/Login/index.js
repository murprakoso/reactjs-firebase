import React from 'react'
import { connect } from 'react-redux'


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
const Login = (props) => {
    return (
        <div>
            <p>Login Page {props.popupProps}</p>
        </div>
    )
}

const reduxState = (state) => ({
    popupProps: state.popup
})

export default connect(reduxState, null)(Login)
