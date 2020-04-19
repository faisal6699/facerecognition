import React from 'react';
import Tilt from  'react-tilt'
import Brain from './Brain.png'
import './Logo.css'

const Logo = () => {
        return (
            <div className='ma2'>

            <Tilt className="Tilt br2 shadow2" options={{ max : 55, speed: 300 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img style={{paddingTop: "5px"}} src={Brain} alt='Logo'/> </div>
            </Tilt>

            </div>
        );

}

export default Logo;