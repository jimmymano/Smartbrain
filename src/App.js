import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'ec514acc370b4b3caa8fe2e9b1790573'
});

const particlesOptions = {
  particles: {number:{
    value:150,
    density:{
      enable:true,
      value_area:900
    }
  }
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
  }

  calculateFaceLocation =(data)=>{

  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
  this.setState({imageUrl:this.state.input})
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input).then(
      function(response){
        
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err){

      }
    )
  }

  render(){
  return (
    <div className="App">
      <Particles className='particles'params={particlesOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/> 
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;
