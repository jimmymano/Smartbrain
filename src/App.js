import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
// import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {number:{
    value:150,
    density:{
      enable:true,
      value_area:1000
    }
  }
  }
}

const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state= initialState;
  }

loadUser = (data) =>  {
  this.setState({user:{
    id:data.id,
    name:data.name,
    email:data.email, 
    entries:data.entries,
    joined:data.joined
  }})
}

componentDidMount(){
  fetch('http://localhost:3000/')
  .then(response=>response.json())
  .then(data=>console.log(data))
}

  calculateFaceLocation =(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("width:",width,"height:",height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col*width),
      bottomRow:height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://git.heroku.com/fast-headland-27705.git/imageurl', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://git.heroku.com/fast-headland-27705.git/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route ==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route}) 
  }

  render(){
  return (
    <div className="App">
      <Particles className='particles'params={particlesOptions}/>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route==='home'
      ?<div>
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/> 
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      :(
        this.state.route==='signin'
        ?<SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        
      )
      }
    </div>
  );
}
}

export default App;
