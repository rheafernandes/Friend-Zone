import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: "",
            username: "",
            userPresent: ""
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/getuser')
            .then(res =>
                this.setState({
                    users: res.data
                })
            )
    }

    handleOnChangeInput(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value

        });
    }

    // checks if the users exists in this.state.users, if yes, redirect to /user-profile pageaa

    handleLoginUser(e) {
        console.log("checking if user exists");
        const index = this.state.users.findIndex(u => u.username === this.state.username);
        console.log('index', index);
        if (index > -1) this.setState(() => ({ userPresent: true }));
    }

    render() {
        return (
            <Fragment>
                <div className="bg-image">
                    <h1 className="text-center login-logo text-light">Friend-Zone</h1>
                    <div className="login-form">
                        <h3 className="text-center login-head">Login</h3>
                        <form className="text-center" onSubmit={e => e.preventDefault()}>
                            <input type="text" placeholder="Enter Username" className="form-control" onChange={this.handleOnChangeInput.bind(this)} />
                            <button className="btn btn-info" onClick={this.handleLoginUser.bind(this, this.state.username)}>Login</button>
                            {(this.state.userPresent) ? <Redirect to={{ pathname: "/User", state: { username: this.state.username } }} /> : <Redirect to="/loginPage" />}

                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}