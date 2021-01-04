import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI } from '../../../config/redux/action'


// const initialState = { title: '', content: '', date: '' }


class Dashboard extends Component {

    state = { title: '', content: '', date: '' }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleSaveNotes = () => {
        const { title, content } = this.state
        const { saveNotes } = this.props
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: this.props.userData.uid
        }
        console.log(data)
        saveNotes(data)
    }

    render() {

        const { title, content } = this.state

        return (
            <div className="container">
                <h3 className="mt-5 mb-2">Dashboard</h3>
                <div className="form-group">
                    <input className="form-control mb-2" type="text" placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="form-control mb-2" placeholder="content" value={content} onChange={(e) => this.onInputChange(e, 'content')}></textarea>
                    <button className="btn btn-outline-primary" onClick={this.handleSaveNotes}>Simpan</button>
                </div>
                <hr />
                <div className="card card-body shadow">
                    <p>Title</p>
                    <small>4 Januari 2021</small>
                    <p>Content Notes</p>
                </div>

            </div>
        )
    }
}


const reduxState = (state) => ({
    userData: state.user
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data))
})


export default connect(reduxState, reduxDispatch)(Dashboard)