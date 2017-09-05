import React, { Component } from 'react';

import './style.css';

class ImageFigure extends Component {
  clickHandle = (e) => {
    const { isCenter } = this.props.arrage;
    if (isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    
    //console.log('xx')
  }
  render() {
    const { data, arrage } = this.props;
    const styleObj = arrage.pos;
    const { rotate, isInverse, isCenter } = arrage;
    ['WebkitTransform', 'MozTransform', 'MsTransform', 'transform'].forEach((item, index) => {
      styleObj[item] = `rotate(${rotate}deg)`;
    });
    if (isCenter) {
      styleObj['zIndex'] = 11;
    }
    return (
      <div className="image-figure-wrap" onClick={this.clickHandle}  style={styleObj}>
      <div className={'image-figure' + (isInverse ? ' is-inverse' : '')}>
        <img src={data.imageUrl} alt={data.title}/>
        <h2>{data.title}</h2>
        <div className="img-back">
          <p>{data.desc}</p>
        </div>    
      </div>
      </div>
    );
  }
}

export default ImageFigure;