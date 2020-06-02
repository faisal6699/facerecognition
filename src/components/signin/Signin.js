import React from 'react';


class Signin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            signinEmail: '',
            signinPassword: ''
        }
    }

    onEmailchange = (event) => {
        this.setState({signinEmail: event.target.value});
    }

    onPasswordchange = (event) => {
        this.setState({ signinPassword: event.target.value});
    }

    onSubmitsignin = () => {
        fetch('https://agile-shelf-91345.herokuapp.com/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        }).then(response => response.json())
            .then(data => {
                if(data.id){
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
            })
        
        
    }

    render() {
        const { onRouteChange} = this.props;
    
        return (
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center">
        <main className="pa4 black-80">
        <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" />
        <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
        <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address" 
        onChange = { this.onEmailchange }    
        />
        </div>
        <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password" 
        onChange = { this.onPasswordchange}
        />
        </div>
        <div className="">
        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        type="submit" value="Sign in" onClick={ this.onSubmitsignin   } />
        </div>
        <div className="lh-copy mt3">
        <p  className="f6 link dim black db pointer" onClick= {() => onRouteChange('register')}>Register</p>
        </div>
        </div>
        </main>
        </article>
        );

    }

}

export default Signin;