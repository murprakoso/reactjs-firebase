import React from 'react';
// import { Button } from 'react-bootstrap';


const Button = ({ title, onClick, loading }) => {

    if (loading === true) {
        return (
            <button className="col md-auto btn btn-primary" disabled>
                Loading...
            </button>
        )
    }
    return (
        <button onClick={onClick} className="col md-auto btn btn-primary">
            {title}
        </button>
    )
}

export default Button;