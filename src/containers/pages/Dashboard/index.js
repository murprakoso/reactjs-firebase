import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action'


// const initialState = { title: '', content: '', date: '' }


class Dashboard extends Component {

    state = { title: '', content: '', date: '', textButton: 'Simpan', noteId: '' }

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
        const { title, content, textButton, noteId } = this.state
        const { saveNotes, updateNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if (textButton === 'Simpan') {
            saveNotes(data)
            this.clearState()
        } else {
            data.noteId = noteId
            updateNotes(data)
            this.clearState()
        }
    }

    clearState = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'Simpan',
            noteId: ''
        })
    }

    handleUpdateNotes = (note) => {
        const { data } = note
        // console.log(note.id);
        this.setState({
            title: data.title,
            content: data.content,
            textButton: 'Update',
            noteId: note.id
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleDeleteNotes = (e, note) => {
        e.stopPropagation()
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        this.props.deleteNotes(data)
        // alert('ok')
    }


    //render
    render() {

        const { title, content, textButton } = this.state
        const { notes } = this.props

        return (
            <div className="container">
                <h3 className="mt-5 mb-2">Dashboard</h3>
                <div className="form-group">
                    <input className="form-control mb-2" type="text" placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="form-control mb-2" placeholder="content" value={content} onChange={(e) => this.onInputChange(e, 'content')}></textarea>
                    <button className="btn btn-outline-primary" onClick={this.handleSaveNotes}>{textButton}</button>
                    {
                        textButton === 'Update' ? (
                            <button className="btn btn-outline-warning ml-2" onClick={this.clearState}>Cancel</button>
                        ) : null
                    }
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card shadow mb-2 cursor-pointer" key={note.id} onClick={() => this.handleUpdateNotes(note)}>
                                            <div className="card-body">
                                                <strong>{note.data.title}</strong>
                                                <small>{note.data.date}</small>
                                                <p>{note.data.content}</p>
                                                <button class="btn btn-danger float-right" onClick={(e) => this.handleDeleteNotes(e, note)} style={{ position: 'relative', clear: 'both' }}>X
                                            </button>
                                            </div>
                                        </div>
                                    )
                                }).reverse()
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
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data))
})


export default connect(reduxState, reduxDispatch)(Dashboard)