import React from 'react'
import { connect } from 'react-redux'
import { actionUserName } from '../../../config/redux/action'


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

    const changeUser = () => {
        props.changeUserName()
    }

    return (
        <div>
            <p>Login Page {props.userName}</p>
            <button onClick={changeUser}>Change User Name</button>
        </div>
    )
}


const reduxState = (state) => ({
    popupProps: state.popup,
    userName: state.user
})

const reduxDispatch = (dispatch) => ({
    changeUserName: () => dispatch(actionUserName())
})


export default connect(reduxState, reduxDispatch)(Login)
