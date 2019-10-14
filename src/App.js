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
      imgUrl: ''
    }
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value })
  }

  onSubmitButton = () => {
    this.setState({ imgUrl: this.state.input})
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        // Do something with response
        console.log(response);
      },
      function(err){
        // There was an error
        console.log(err);
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
        <FaceRecognition imgUrl = {this.state.imgUrl} />
      </div>
    );
  }
}

export default App;