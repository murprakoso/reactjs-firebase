import firebase from '../../firebase';
import { CHANGE_ISLOGIN, CHANGE_LOADING, CHANGE_USER } from "../../../constants/actionTypes"


export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'Murdianto Prakoso' })
    }, null);
}


/** Register User */
export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: CHANGE_LOADING, value: true })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // Registered
                console.log('success: ', res);
                dispatch({ type: CHANGE_LOADING, value: false })
                resolve(true)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
                dispatch({ type: CHANGE_LOADING, value: false })
                reject(false)
            })
    })
}

/** Login User */
export const loginUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({ type: CHANGE_LOADING, value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // Logged in
                console.log('success: ', res);
                const dataUser = {
                    email: res.user.email,
                    uuid: res.user.uuid,
                    emailVerivied: res.user.emailVerivied
                }
                dispatch({ type: CHANGE_LOADING, value: false })
                dispatch({ type: CHANGE_ISLOGIN, value: true })
                dispatch({ type: CHANGE_USER, value: dataUser })
                resolve(true)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
                dispatch({ type: CHANGE_LOADING, value: false })
                dispatch({ type: CHANGE_ISLOGIN, value: false })
                reject(false)
            })
    })

}