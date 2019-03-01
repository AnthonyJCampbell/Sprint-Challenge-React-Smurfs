import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({smurfs: res.data}))
      .catch(err => console.log('Somethings wrong', err));
  }

  postSmurf = (name, age, height) => {
    console.log(name, age, height)
    axios.post('http://localhost:3333/smurfs', {name, age, height})
      .then(res => this.setState({smurfs: res.data}))
      .catch(err => console.log(`Something's wrong with the POSTSMURF() ${err}`));
  }

  smurfASmurf = (id) => {
    axios.delete(`http://localhost:3333/smurfs/${id}`, )
      .then(res => this.setState({smurfs: res.data}))
      .catch(err => console.log(`There's a smurfin' error with the smurfASmurf function. Best smurf it out real quick!`));
  }

  render() {
    return (
        <div className="App">
          <Route path="/smurfform" render={props => (
            // SmurfForm to be rendered on '/smurfform'
            <SmurfForm  postSmurf={this.postSmurf} {...props}/>
            )} />

            {/* Links are always visible and acts as nav */}
            <Link to={`/`}><h2>Smurf the Smurfs</h2></Link>
            <Link to={`/smurfform`}><h2>Smurf New Smurfs</h2></Link>

          {/* Smurfs is the list of all smurfs, visible on '/' */}
          <Route exact path="/" render={props => (
            <Smurfs {...props} smurfs={this.state.smurfs} smurfASmurf={this.smurfASmurf}/>
          )} />
        </div>
    );
  }
}
export default App;
