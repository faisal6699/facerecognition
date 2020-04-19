import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onClickButton }) => {
        return (
            <div>
            <p className='f5'>{'This Magic Brain will detect your face. Give it a try'}</p>
            <div className='center'>
                    <div className='form center pa3  shadow-5'>
                    <input type='text' className='f5   w-70 center' onChange={ onInputChange } />
                    <button onClick={onClickButton} className='w-30 f5 grow center link  ph2 pv3 dib  bg-light-green' >detect</button>
                </div>

                </div>

            </div>
        );

}

export default ImageLinkForm;