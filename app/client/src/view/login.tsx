import * as React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <div onClick={() => {alert(1)}}>Login</div>
                <Button variant="contained" color="primary">确认1</Button>
                <Link to="/sub">to sub1</Link>
            </div>
        )
    }
}