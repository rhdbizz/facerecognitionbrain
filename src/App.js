import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculatedFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmitButton = () => {
    this.setState({ imgUrl: this.state.input })
    console.log('click');
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculatedFaceLocation(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'signout') {
      this.setState({isSignedIn : false})
    } else if (route === 'home') {
      this.setState({isSignedIn : true})
    }
    this.setState({route : route });
  }

  render() {
    const { isSignedIn, box, imgUrl, route } = this.state;
    return (
      <div className="App">
        <Particles
          className = "particles"
          params = {particleOption}
        />
        <Navigation 
          onRouteChange = {this.onRouteChange} 
          isSignedIn = {isSignedIn}  
        />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange = {this.onInputChange}
                onSubmitButton = {this.onSubmitButton}
              />
              <FaceRecognition box={box} imgUrl = {imgUrl} />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange = {this.onRouteChange} />
            : <Register onRouteChange = {this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;