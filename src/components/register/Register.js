import React from 'react';


class Register  extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }


    onNamechange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onEmailchange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordchange = (event) => {
        this.setState({ registerPassword: event.target.value});
    }

    onSubmitregister = () => {
        fetch('https://agile-shelf-91345.herokuapp.com/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        }).then(response => response.json())
            .then(user => {
                if(user.id ){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
        
        
    }



    render(){
        //const { onRouteChange} = this.props;
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center">
                <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" />
                <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 " 
                    type="name" 
                    name="name"  
                    id="name" 
                    onChange = {this.onNamechange}    
                    />
                </div>
                <div className="mt3">
                    <label 
                    className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange = {this.onEmailchange}    
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange = {this.onPasswordchange}
                    />
                </div>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" value="Register" onClick={ this.onSubmitregister } />
                </div>
            </div>
            </main>
            </article>
            );
    }


}

export default Register;