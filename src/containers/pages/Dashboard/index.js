import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI, getDataFromAPI } from '../../../config/redux/action'


// const initialState = { title: '', content: '', date: '' }


class Dashboard extends Component {

    state = { title: '', content: '', date: '' }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleSaveNotes = () => {
        const { title, content } = this.state
        const { saveNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        console.log(data)
        saveNotes(data)
    }

    render() {

        const { title, content } = this.state
        const { notes } = this.props
        console.log(notes);

        return (
            <div className="container">
                <h3 className="mt-5 mb-2">Dashboard</h3>
                <div className="form-group">
                    <input className="form-control mb-2" type="text" placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="form-control mb-2" placeholder="content" value={content} onChange={(e) => this.onInputChange(e, 'content')}></textarea>
                    <button className="btn btn-outline-primary" onClick={this.handleSaveNotes}>Simpan</button>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card card-body shadow mb-2" key={note.id}>
                                            <p>{note.data.title}</p>
                                            <small>{note.data.date}</small>
                                            <p>{note.data.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : 'Loading...'
                }

            </div>
        )
    }
}


const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data))
})


export default connect(reduxState, reduxDispatch)(Dashboard)