import React, { Component } from 'react';
import { FaUserPlus} from 'react-icons/fa';

export default class RecommendationCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            addedFriend : false
        }
    }
    
    handleAddUser(e){
        this.props.addFriend(this.props.friendId);
        this.setState({
            addedFriend:!this.state.addedFriend
        });
    }

    render() {
        return (
            <div className="card col-sm-12 mx-auto my-5 recommendation-card" >
                {/* <img className="card-img-top" src="https://articles-imag!this.state.addedFriendes.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg" alt="Profile Picture"></img> */}
                <div className="card-body text-center">
                    <h5 className="card-title">
                        <a href="#">{this.props.friendName}</a>

                    </h5>
                    {!this.state.addedFriend?<button onClick={this.handleAddUser.bind(this)} className="btn btn-outline-danger"><FaUserPlus/></button>:null}
                </div>
            </div>

        );
    }

}
