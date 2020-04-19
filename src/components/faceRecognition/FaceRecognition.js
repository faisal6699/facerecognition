import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, faceBox }) => {

        return (
            <div className='center ma'>
                <div className='absolute mt1'>

                <img src={imageUrl} alt='' height='auto' width='300' id='inputImage' />
                <div className='bounding-box' 
                style={{top: faceBox.topRow, left: faceBox.leftCol, right: faceBox.rightCol, bottom: faceBox.bottomRow}}></div>
           
                </div>
            </div>
        );

}

export default FaceRecognition;