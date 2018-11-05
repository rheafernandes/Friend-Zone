import React from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';


export default class ProfileCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card profile-card text-dark">
                <img className="card-img-top" src={this.props.userInfo.imageUrl} alt="Profile Picture"></img>
                <div className="card-body text-center">
                    <h5 className="card-title">{this.props.userInfo.name}</h5>
                    <p className="card-text">{this.props.userInfo.description}</p>
                    <div className="row">
                        <div className="col-sm-6">
                            <FaUsers />
                        </div>
                        <div className="col-sm-6">{this.props.friendsCount}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">Age</div>
                        <div className="col-sm-6">{this.props.userInfo.age}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">Birthdate</div>
                        <div className="col-sm-6">{this.props.userInfo.birthdate}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">Interests</div>
                        <div className="col-sm-6">Sky Diving</div>
                    </div>
                </div>
            </div>
        );
    }
}