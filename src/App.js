import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import Particles from "react-particles-js";
import IntregatedApis from "./components/intregatedApis/IntregratedApis";
import SpeechToText from "./components/speechToText/SpeechToText";
import "./App.css";
import "tachyons";

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignin: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceDetection = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(clarifaiFace.leftCol);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onClickButton = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://agile-shelf-91345.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://agile-shelf-91345.herokuapp.com/image", {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        //console.log(this.calculateFaceDetection(response));
        this.displayFaceBox(this.calculateFaceDetection(response));
      })
      .catch((err) => console.log(err));
  };

  

  onRouteChange = (route) => {
    this.setState({ route: route });
    //console.log(route);
    switch (route) {
      case "land":
        return this.setState({ isSignin: true });
      case "face":
        return this.setState({ isSignin: true });
        case "voice":
          return this.setState({ isSignin: true });
      case "signout":
        return this.setState(initialState);

      default:
        return this.setState({ isSignin: false });
    }
  };

  render() {
    const { imageUrl, box, isSignin, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignin={isSignin} route={route} />
        {route === "face" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onClickButton={this.onClickButton}
            />
            <FaceRecognition imageUrl={imageUrl} faceBox={box} />
          </div>
        ) : route === "voice" ? (
          <div>
          <SpeechToText name = {this.state.user.name} />
          
          </div>
        
        ) : route === "land" ? (
          <IntregatedApis onRouteChange = {this.onRouteChange}/>
        ): route === "register" ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
