import React from 'react';

class SignIn extends React.Component {
//Set State
constructor(props){
    super(props);
    this.state={
        signInEmail:'',
        signInPassword:''
    }
}
//Change State
onEmailChange = (event) =>{
    this.setState({signInEmail:event.target.value})
}    

onPasswordChange = (event) =>{
    this.setState({signInPassword:event.target.value})
}   

onSubmitSignIn = () =>{
    fetch('https://fast-headland-27705.herokuapp.com/signin',{
        mode:'no-cors',
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:this.state.signInEmail,
            password:this.state.signInPassword
        })
    }).then(response => response.json())
      .then(user =>{
          if(user.id){
            this.props.loadUser(user)
            this.props.onRouteChange('home')
          }
      })

}

render(){
  
    return(
        // Style and Format
                <article className="br3 shadow-5 ba  --black-10 mv4 w-100 w-50-m w-25-l mw6 center">    
                <main className="pa4 black-80">
                    <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        onChange = {this.onEmailChange}
                        type="email" 
                        name="email-address"  
                        id="email-address"/>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        onChange = {this.onPasswordChange}
                        type="password" 
                        name="password"  
                        id="password"/>
                        </div>
                    </fieldset>
        {/* Routing */}
        <div className="">
        <input 
            onClick={this.onSubmitSignIn} 
            className="b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib" 
            type="submit" 
            value="Sign in"/>
        <p className="f6 pointer link dim black db">
                Register
        </p> 
            </div>
        
            <div className="lh-copy mt3">
        </div>
        
            </div>
            </main>
            </article>
            )
}    
}
  
export default SignIn