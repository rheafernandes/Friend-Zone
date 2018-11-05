import React, { Component } from 'react';
import ProfileCard from '../Components/ProfileCard'
import FriendCards from '../Components/FriendCards';
import RecommendationCard from './RecommendationCard';

export default class MainGrid extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFriendPage:this.props.friendname===""?false:true
        }
    }
    render() {
        if (this.props.friendList) {
            return (
                <div className="container-fluid  main-grid">
                    <div className="row ">
                        <div className="col-sm-3 section-bg  text-center profile-info">
                            <h5 className=" grey-section info-heading text-dark">{this.props.friendname?this.props.friendname+"'s":"My"} Profile</h5>
                            <ProfileCard userInfo={this.props.userInfo} friendsCount={this.props.friendList.length} userId={this.props.userId} />
                        </div>
                        <div className="col-sm-6 text-center friend-list">
                            {
                                this.props.dispChange === false ?
                                    <h5 className="info-heading text-dark">Friends</h5>
                                    : <h5 className="info-heading text-dark">Results</h5>
                            }
                            <div className="d-flex flex-row">
                                {
                                    this.props.dispChange === false ?
                                        this.props.friendList.map((friend,index) => <FriendCards key={index} friendName={friend.name} changeUserPage={this.props.changeUserPage} friendId={friend.username} display="none" userId={this.props.userid} removeFriend={this.props.removeFriend} isFriendPage={this.state.isFriendPage}/>)
                                        : this.props.searchedUsers.map((searched,index) => <FriendCards key={index} friendName={searched.name} friendId={searched.username} addFriend={this.props.addFriend} display="block" isFriendPage={this.state.isFriendPage}/>)
                                }
                            </div>
                        </div>
                        <div className="col-sm-3 text-center recommendation-list">
                            {
                                this.props.recommendationDisp === false ?
                                    <h5 className="info-heading text-dark">You may know</h5>
                                    : <h5 className="info-heading text-dark">Also may know</h5>
                            }
                            <div className="d-flex flex-column">
                                {
                                    this.props.recommendationDisp === false ?
                                    this.props.levelOne.map((friend,index) => <RecommendationCard key={index} friendName={friend.name} friendId={friend.username} addFriend={this.props.addFriend}/>)
                                    :this.props.levelTwo.map((friend,index) => <RecommendationCard key={index} friendName={friend.name} friendId={friend.username} addFriend={this.props.addFriend}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container-fluid main-grid">
                    <div className="row">
                        <div className="col-sm-3 section-bg  text-center profile-info">
                            <h5 className=" grey-section info-heading text-dark">My Profile</h5>
                            <ProfileCard userInfo={this.props.userInfo} userId={this.props.userId} />
                        </div>
                        <div className="col-sm-6 text-center friend-list">
                            {
                                this.props.dispChange === false ?
                                    <h5 className="info-heading text-dark">Friends</h5>
                                    : <h5 className="info-heading text-dark">Results</h5>
                            }
                            <div className="d-flex flex-row">
                                {
                                    this.props.dispChange === true ?
                                    this.props.searchedUsers.map((searched,index)=> <FriendCards key={index} friendName={searched.name} friendId={searched.username} addFriend={this.props.addFriend} display="block" removeFriend={this.props.removeFriend.bind(this)} isFriendPage={this.state.isFriendPage}/>)
                                    :null
                                }
                            </div>
                        </div>
                        <div className="col-sm-3  text-center recommendation-list">
                            {
                                this.props.recommendationDisp === false ?
                                    <h5 className="info-heading text-dark">Add Some Friends</h5>
                                    : <h5 className="info-heading text-dark">A few more</h5>
                            }
                            <div className="d-flex flex-column">
                                {
                                    this.props.recommendationDisp === false ?
                                    this.props.levelOne.map((friend,index) => <RecommendationCard key={index} friendName={friend.name} friendId={friend.username} addFriend={this.props.addFriend} isFriendPage={this.state.isFriendPage}/>)
                                    :this.props.levelTwo.map((friend,index) => <RecommendationCard key={index} friendName={friend.name} friendId={friend.username} addFriend={this.props.addFriend} isFriendPage={this.state.isFriendPage}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}