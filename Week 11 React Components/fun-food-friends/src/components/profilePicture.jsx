import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from "../firebase";

class ProfilePic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={'user-profile'}>
          <img src={this.props.user.photoURL} />
        </div>
    )
  }
}

export default ProfilePic;
