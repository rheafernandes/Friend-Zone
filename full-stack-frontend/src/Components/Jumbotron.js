import React, { Fragment, Component } from 'react';
import Modal from './Modal';
import { NavLink } from 'react-router-dom'

export class Jumbotron extends Component {
  render() {
    return (
      <Fragment>
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="jumbotron-form">
              <h1 className="display-4 text-center">Friend-zone</h1>
              <p className="lead text-center jumboQ-para">"Connect with people all over the world"</p>
              <hr className="my-4" />
              <p className="text-center jumbo-para">You're ready to go in 2 Simple steps. Enjoy this virtual world we created<span>|</span></p>
              <div className="text-center">
                <NavLink to="/registerPage" className="btn btn-dark  btn-lg mr-2" role="button">Sign Up</NavLink>
                <NavLink to="/loginPage" className="btn btn-primary btn-lg" role="button">Sign In</NavLink>
              </div>
            </div>
          </div>
          <div className="text-center text-light">Created By Rhea Fernandes and Shreya Shah</div>
        </div>
        <Modal />
      </Fragment>
    );
  }
}