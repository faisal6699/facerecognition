import React from 'react';

const Navigation = ({ onRouteChange, isSignin }) => {
  
            if(isSignin)  {

                return(
    
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p className='f4 link dim black underline  pointer' onClick={() => onRouteChange('signout')}>sign out </p>  
                </nav>
                );
            } 
            
            else{

                return(
    
                <nav style={{display:'flex', justifyContent:'flex-end', }}>
                <p className='f4 link dim black underline  pointer ma2' onClick={() => onRouteChange('home')}>sign in </p>  
                <p className='f4 link dim black underline  pointer ma2' onClick={() => onRouteChange('home')}>register </p>  
                </nav>
    
                );
            }
        
           
    

}

export default Navigation;