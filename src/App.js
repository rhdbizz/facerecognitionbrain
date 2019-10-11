import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: 'triangle'
    }
  }
}

const app = new Clarifai.App({
  apiKey: '5f0d29ff8e0f4d978df633fe770c416a'
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmitButton = () => {
    console.log('click');
    app.models.predict(Clarifai.COLOR_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
      function(response){
        // Do something with response
        console.log(response);
      },
      function(err){
        // There was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles
          className = "particles"
          params = {particleOption} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange = {this.onInputChange}
          onSubmitButton = {this.onSubmitButton}
        />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;