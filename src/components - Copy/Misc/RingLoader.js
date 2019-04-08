import React from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';
class LoadingIcon extends React.Component {
  render(){
    const override = css`
        display: block;
        margin-left: 45%;
        border-color: red;
    `;
    return(
      <div className='sweet-loading' style={{margin:'50px 0'}}>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={75}
          color={'#5A1894'}
        />
      </div>
    )
  }
}
export default LoadingIcon;