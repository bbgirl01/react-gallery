import React, { Component } from 'react';

import './style.css';

class ControllerUnit extends Component {
  render() {
    const { arrange } = this.props;
    return (
      <div className="controller-unit">
        {
          arrange.map((item, index) => {
            let unitClassName = item.isCenter ? 'is-center' : '';
              unitClassName += item.isInverse ? ' is-inverse' : '';
            return (
              <span key={index} onClick={()=>this.clickHandle(item.isCenter, index)} className={unitClassName}></span>
            )
          })
        }      
      </div>
    )
  }
  clickHandle = (isCenter, index) => {
    if (isCenter) {
      this.props.inverse(index);
    } else {
      this.props.center(index);
    }
  }
}

export default ControllerUnit;