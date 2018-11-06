import React, { Component, Fragment } from 'react';
import Navbar from '../Components/Navbar';
import MainGrid from '../Components/MainGrid';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendname:"",
      user: "",
      friends: [],
      searchValue: "",
      searchedUsers: [],
      dispChange: false,
      recommendationDisp: false,
      levelOne: [],
      levelTwo: [],
      userDeleted: false,
      username: this.props.location.state.username
    }
  }

  handleLevelOne(e) {
    this.setState({
      recommendationDisp: false
    }
    )
    e.preventDefault()
    axios.get(`http://172.23.238.178:8080/api/v1/recommendL1/${this.state.username}/1`)
      .then(res =>
          this.setState({
          levelOne: res.data,
        })
      ).catch(err => {
        console.log("Error retreiving Info");
      });
  }
  handleLevelTwo(e) {
    e.preventDefault();
    this.setState({
      recommendationDisp: true
    }
    )
    axios.get(`http://172.23.238.178:8080/api/v1/recommendL1/${this.state.username}/2`)
      .then(res =>
        this.setState({
          levelTwo: res.data,
        })
      ).catch(err => {
        console.log("Error retreiving Info");
      });
  }

  handledeleteUser(e) {
    e.preventDefault();
    axios.delete(`http://172.23.238.178:8080/api/v1/deleteuser/${this.state.username}`)
      .then(() => {
        console.log('Deleted User from server');
        this.setState(() => ({ userDeleted: true }));
      })
      .catch(err => {
        console.error('There was a problem deleting the user. ERR:', err);
        this.setState(() => ({ userDeleted: true }));
      });
  }
  addFriend(friendId) {
    axios.put(`http://172.23.238.178:8080/api/v1/addfriend/${this.state.username}/${friendId}`)
    .then(res =>{
      console.log("adding a friend...")
      axios.get(`http://172.23.238.178:8080/api/v1/getuserfriends/${this.state.username}`)
      .then(res=>{
        this.setState(()=>({friends:res.data}))
      })
    }

    )
    console.log(this.state.username + " has added " + friendId);
  }

  removeFriend(friendId) {
    console.log(this.state.username + " removed " + friendId);
    axios.delete(`http://172.23.238.178:8080/api/v1/deleteuserfriend/${this.state.username}/${friendId}`)
    .then(res =>{
      this.setState(()=>({user:res.data}))
      axios.get(`http://172.23.238.178:8080/api/v1/getuserfriends/${this.state.username}`)
      .then(res =>
        this.setState({
          friends: res.data
        })
        ).catch(err => {
          console.log("Error retreiving Info");
        });
    }
    )

  }

  
  handleChangeDispR(e) {
    e.preventDefault();
    this.setState({
      dispChange: true
    })
    this.handleSearchUser()
  }
  
  handleChangeDispF(e) {
    e.preventDefault();
    this.setState({
      dispChange: false
    })
    this.handleSearchUser()
  }

  handleChangedNewEntry(e) {
    this.setState({ searchValue: e.target.value });
  }
  handleSearchUser() {
    axios.get(`http://172.23.238.178:8080/api/v1/searchusers/${this.state.username}/${this.state.searchValue}`)
      .then(res =>
      {
        let newSearched=res.data.filter(doc=>doc.username!==this.state.username) //&& doc.username!==friends.username
        console.log(newSearched);
        this.setState({
          searchedUsers: newSearched
        })
      }
      ).catch(err => {
        console.log("Error retreiving Info");
      });
  }
  componentDidMount() {
    console.log('called componentDidMount()');
    axios.get(`http://172.23.238.178:8080/api/v1/getUserDetails/${this.state.username}`)
      .then(res =>
        this.setState({
          user: res.data,
        })
      ).catch(err => {
        console.log("Error retreiving Info");
      });
      axios.get(`http://172.23.238.178:8080/api/v1/getuserfriends/${this.state.username}`)
      .then(res =>
        this.setState({
          friends: res.data
        })
        ).catch(err => {
          console.log("Error retreiving Info");
        });
  }
  changeUserPage() {
    axios.get(`http://172.23.238.178:8080/api/v1/getUserDetails/${this.state.username}`)
      .then(res =>{
        this.setState({
          user: res.data,
        })
        axios.get(`http://172.23.238.178:8080/api/v1/getuserfriends/${this.state.username}`)
        .then(res =>
          this.setState({
            friends: res.data
          })
          ).catch(err => {
            console.log("Error retreiving Info");
          })
        }
       ).catch(err => {
        console.log("Error retreiving Info");
      });

  }

  render() {
    return (
      <Fragment>
        <Navbar
          handleLevelOne={this.handleLevelOne.bind(this)}
          handleLevelTwo={this.handleLevelTwo.bind(this)}
          handleChangedNewEntry={this.handleChangedNewEntry.bind(this)}
          // handleSearchUser={this.handleSearchUser.bind(this)}
          handleChangeDispR={this.handleChangeDispR.bind(this)}
          handleChangeDispF={this.handleChangeDispF.bind(this)}
          handleDeleteUser={this.handledeleteUser.bind(this)}
        />
        {
          this.state.user ?
            <MainGrid userInfo={this.state.user}
              friendList={this.state.friends}
              dispChange={this.state.dispChange}
              searchedUsers={this.state.searchedUsers}
              username={this.state.username}
              levelOne={this.state.levelOne}
              levelTwo={this.state.levelTwo}
              addFriend={this.addFriend.bind(this)}
              removeFriend={this.removeFriend.bind(this)}
              recommendationDisp={this.state.recommendationDisp}
              changeUserPage={this.changeUserPage.bind(this)}
              friendname={this.state.friendname}
            />
            : "Please wait till your page loads"
        }

        {(this.state.userDeleted) ? <Redirect to="/loginPage" /> : null}

      </Fragment>
    );
  }
}