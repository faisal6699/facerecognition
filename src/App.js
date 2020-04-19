import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '3c9ff967279b42138e1716361b163e85'
 });

const particleOptions = {
  particles:{
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
    constructor(){
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignin: false
      }
    }

    calculateFaceDetection = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      //console.log(clarifaiFace.leftCol);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row*height,
        rightCol: width - (clarifaiFace.right_col*width),
        bottomRow: height - (clarifaiFace.bottom_row*height)
      }
      
    }

    displayFaceBox = (box) => {
      
      this.setState({ box: box })
    }

    onInputChange = (event) =>{
        this.setState({ input: event.target.value });
    }

    onClickButton = () => {
      this.setState({ imageUrl: this.state.input });
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => {
        //console.log(this.calculateFaceDetection(response));
        this.displayFaceBox(this.calculateFaceDetection(response))
      })
      .catch(err => console.log(err))
      
    }

    onRouteChange = (route) => {

      this.setState({route: route});
      console.log(route);
      switch(route) {
        case 'home': 
        return this.setState({isSignin: true}); 
        case 'signout':
        return this.setState({isSignin: false})

        default :
          return this.setState({isSignin: false })

      }
    
        
            
      
    }


    render(){
      const { imageUrl,box,isSignin,route } = this.state;
      return (
          <div className="App">
          <Particles className='particles' 
                    params={
                      particleOptions
                    }
                    
                  />
                  <Navigation onRouteChange = {this.onRouteChange} isSignin ={isSignin}  />
                  {route === 'home' ?
                  <div>

                  <Logo />
                  <Rank />
                  <ImageLinkForm
                  onInputChange = {this.onInputChange} 
                  onClickButton= {this.onClickButton}
                  />
                <FaceRecognition imageUrl= { imageUrl } faceBox= { box } />
      
                  </div> :
                  ( route === 'register' ?
                    <Register onRouteChange = {this.onRouteChange} />:
                    <Signin onRouteChange = {this.onRouteChange} /> 
                  )  
                    
                  }
          </div>
      );

  }
  }

export default App;
