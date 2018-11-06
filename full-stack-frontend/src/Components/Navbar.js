import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { FaSearch } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Signout: false
        }
    }
    handleSignOut(e) {
        e.preventDefault();
        this.setState(() => ({ Signout: true }))
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent container-fluid">
                <a className="navbar-brand text-dark our-logo col-sm-2" href="#"><FaUserFriends /> Friend-Zone </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <input className="form-control search-input mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.props.handleChangedNewEntry.bind(this)} required={true} />

                        <div data-toggle="tooltip" title="Toggle Search/Friends" data-placement="bottom">
                            <button className="btn btn-outline-dark search-btn my-2 my-sm-0" type="submit" onClick={this.props.handleChangeDisp.bind(this)}>
                                <FaSearch />
                            </button>
                        </div>
                    </form>
                    <ul className="navbar-nav ml-auto  ">
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#" onClick={this.props.handleDeleteUser}>
                                <div data-toggle="tooltip" title="Delete Account" data-placement="bottom">
                                    <FaTrash />
                                </div>
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn notification-btn">
                                <FaBell/><span className="badge badge-light">4</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#" onClick={this.handleSignOut.bind(this)}>
                                <div data-toggle="tooltip" title="Signout" data-placement="bottom">
                                    <FaSignOutAlt />
                                </div>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Recommendation
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={this.props.handleLevelOne.bind(this)}>Level 1</a>
                                <a className="dropdown-item" href="#" onClick={this.props.handleLevelTwo.bind(this)}>Level 2</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Level 3</a>
                            </div>
                        </li>
                    </ul>
                </div>
                {(this.state.Signout) ? <Redirect to="/" /> : null}



            </nav>
        );
    }
}