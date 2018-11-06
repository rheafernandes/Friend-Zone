import React, { Fragment, Component } from 'react';
import Modal from './Modal';
import { NavLink } from 'react-router-dom'

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

export class Jumbotron extends Component {
  render() {
    return (
      <Fragment>
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="jumbotron-form">
              <h1 className="display-4 text-center"> 
              <span
                class="txt-rotate"
                data-period="2000"
                data-rotate='[ "FRIEND-ZONE", "FIND YOUR TRIBE", "LOVE THEM HARD"]'></span>
                </h1>
              <p className="lead text-center jumboQ-para">"Connect with people all over the world"</p>
              <hr className="my-4" />
              <p className="text-center jumbo-para">You're ready to go in 2 Simple steps. Enjoy this virtual world we created<span className="blink">|</span></p>
              <div className="text-center">
                <br />
                <br />
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