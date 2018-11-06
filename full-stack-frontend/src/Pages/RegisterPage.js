import React,{Fragment} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect';
export default class RegisterPage extends React.Component{
    constructor(props){
        super();
        this.state = {
            id:"",
            description:"",
            age:"",
            name:"",
            userCreated:false
        }
    }
    handleChangeUsernameEntry(e) {
        this.setState({ id: e.target.value });
    }
    handleChangeNameEntry(e) {
        this.setState({ name: e.target.value });
    }
    handleChangeDescriptionEntry(e) {
        this.setState({ description: e.target.value }); 
    }
    handleChangeAgeEntry(e) {
        this.setState({ age: e.target.value }); 
    }

    showAlert(){
        alert(responseString);
    }
    addNewUser(e) {
        const numImagesAvailable =178;
        let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
        e.preventDefault();
        console.log("Entering Add User");
        const newUser = {
            username: this.state.id,
            name:this.state.name,
            description:this.state.description,
            age:this.state.age,
            imageUrl:`https://source.unsplash.com/collection/895539/320x320/?sig=${randomImageIndex}`
        };

        axios.post('http://localhost:8080/api/v1/adduser', newUser)
            .then(res => {
                console.log("User is created")
                this.setState(() => ({ userCreated: true }));
            }).catch(err => {
                console.log("Error Creating a User, May already exist");
            });

    }
    render(){
        return(
            <Fragment>
                <div className="bg-image">
                    <h1 className="text-center register-logo text-light">Friend-Zone</h1>
                    <div className="register-form">
                        <h3 className="text-center register-head">Register</h3>
                        <form className="text-center" onSubmit={this.addNewUser.bind(this)}>
                            <input type="text" placeholder="Enter Username" className="form-control" onChange={this.handleChangeUsernameEntry.bind(this)} />
                            <input type="text" placeholder="Name" className="form-control" onChange={this.handleChangeNameEntry.bind(this)} />
                            <input type="text" placeholder="Enter Description" className="form-control" onChange={this.handleChangeDescriptionEntry.bind(this)} />
                            <input type="text" placeholder="Enter Age" className="form-control" onChange={this.handleChangeAgeEntry.bind(this)}/>
                            <button type="submit" className="btn btn-info" >Register</button>
                        </form>
                    </div>
                </div>
                {(this.state.userCreated) ? <Redirect to="/loginPage" /> : null}

            </Fragment>
        );
    }
}