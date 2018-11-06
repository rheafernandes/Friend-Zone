import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { FaUserPlus} from 'react-icons/fa';


export default class FriendCards extends Component {

   constructor(props){
       super(props);
       this.state = {
           showFriend:false,
           addedFriend: false
       }
   }

   showFriendData(e){
       e.preventDefault();
       const showFriend = this.state.showFriend;
       this.setState({
           showFriend: !showFriend
       });
       // this.props.changeUserPage();
   }

   handleAddUser(e){
       this.props.addFriend(this.props.friendId);
       this.setState({
           addedFriend:!this.state.addedFriend
       });
   }

   handleRemoveFriend(e){
       this.props.removeFriend(this.props.friendId);
   }

   render() {
       return (
           <div className="card col-sm-3 mx-2 my-5 friend-card" >
               {/* <img className="card-img-top" src="https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg
https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg
" alt="Profile Picture"></img> */}
               <div className="card-body text-center">
                   <h5 className="card-title">

                       <button className="username-btn" onClick={this.showFriendData.bind(this)} >{this.props.friendName}</button>
                       {(this.props.display==="block" && !this.state.addedFriend)?<button href="#" className="btn btn-outline-danger" onClick={this.handleAddUser.bind(this)}><FaUserPlus/></button>:null}
                        {console.log("added friend?   ",this.state.addedFriend)}
                   </h5>
                   {this.props.isFriendPage?null:<a href="#" onClick={this.handleRemoveFriend.bind(this)} className="btn float-button btn-outline-danger text-dark"><strong>x</strong></a>}
               </div>
               {(this.state.showFriend) ? <Redirect to={{pathname:"/User/friend",state:{username:this.props.userId,friendname:this.props.friendId}}}/>: null}
           </div>

       );
   }

}