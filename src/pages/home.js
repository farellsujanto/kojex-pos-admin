import React, { Component } from 'react';
import { firebaseApp, secondaryApp } from '../firebase.js';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQr: false,
            isLoggedIn: false,
        }
    }

    componentDidMount = () => {

        this.authListener();
    }

    authListener = () => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("LOGGED IN")
                console.log(user)
            } else {
                console.log("LOGGED OUT")
            }
        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    login = () => {
        const email = this.state.email;
        const password = this.state.password;
        firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    register = () => {
        const email = this.state.email;
        const password = this.state.password;
        secondaryApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("User " + user.uid + " created successfully!");
            secondaryApp.auth().signOut();
        })
        .catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    render() {
        return (
            <div>
                <input type="email" name="email" onChange={this.handleChange} />
                <input type="password" name="password" onChange={this.handleChange} />
                <button onClick={this.login} >LOGIN</button>
                <button onClick={this.register} >REGISTER</button>
            </div>
        );
    }
}

export default HomePage;