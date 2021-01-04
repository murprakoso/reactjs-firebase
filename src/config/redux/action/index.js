import firebase, { database } from '../../firebase';
import { CHANGE_ISLOGIN, CHANGE_LOADING, CHANGE_USER } from "../../../constants/actionTypes"


export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'Murdianto Prakoso' })
    }, null);
}

/** LOGIN */
// Register 
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

// Login
export const loginUserAPI = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({ type: CHANGE_LOADING, value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // Logged in
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerified: res.user.emailVerified,
                    refreshToken: res.user.refreshToken
                }
                dispatch({ type: CHANGE_LOADING, value: false })
                dispatch({ type: CHANGE_ISLOGIN, value: true })
                dispatch({ type: CHANGE_USER, value: dataUser })
                resolve(dataUser)
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

/**
 * CRUD
 */
export const addDataToAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}