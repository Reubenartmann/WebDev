
import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from "../firebase";


class Login extends Component{
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
}

logout() {
       auth.signOut()
           .then( () => {
              this.props.onAuthUser(null);
           });
   }

   login() {
       auth.signInWithPopup(provider)
           .then((result) => {
               const user = result.user;
               this.props.onAuthUser(user);
           });
   }

   render() {
       return (
           <div>
               {this.props.user ?
                   <button onClick={this.logout}>Log Out</button>
                   :
                   <button onClick={this.login}>Log in</button>
               }
           </div>
       )
   }
}

export default Login;
