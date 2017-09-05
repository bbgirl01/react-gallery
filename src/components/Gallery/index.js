import React, { Component } from 'react';
import ImageFigure from './subpage/ImageFigure';
import ControllerUnit from './subpage/ControllerUnit';

import './style.css';

// 获取图片相关的数据
import imageDatas from '../../data/imageDatas.json';
// var imageDatas = require('../../data/imageDatas.json');

// 利用自执行函数，将图片名信息转成图片URL路径信息
const imageDatasArr = (function genImageUrl(imageDatasArr) {
  imageDatas.forEach((item, index) => {
    const singleImageData = imageDatasArr[index];
    singleImageData.imageUrl = require('../../images/' + singleImageData.fileName);
    imageDatasArr[index] = singleImageData;
  })
  return imageDatasArr;
})(imageDatas);

// 用来存储排布的可取值范围
const Constant = {
  // 中心图片的位置点
  centerPos: {
    left: 0,
    top: 0
  },
  hPosRange: { // 水平方向的取值范围
    leftSecX: [0, 0], // 左分区x的取值范围
    rightSecX: [0, 0], // 右分区x的取值范围
    y: [0, 0]
  },
  vPosRange: { // 垂直方向的取值范围
    x: [0, 0],
    topY: [0, 0]
  }
}
/**
 * 获取区间内的随机值
 */
function getRangeRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 获取正负30deg以内的随机角度
 */
function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.random() * 30;
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,
        //   isInverse: false // 是否翻转
        //   isCenter: false // 时候居中
        // }
      ]
    };
  }

  /**
   * 翻转图片
   */
  inverse = (index) => {
    const { imgsArrangeArr } = this.state;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr
    });
  }

  /**
   * 居中图片
   */
  center = (index) => {
    console.log(index)
    this.rearrange(index);
  }
  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearrange = (centerIndex) => {
    var { imgsArrangeArr } = this.state,
    // const Contant = this.Constant;
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeX = vPosRange.x,
      vPosRangeTopY = vPosRange.topY,

      imgsArrageTopArr = [],
      topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取
      topImgSpliceIndex = 0,

      imgsArrageCenterArr = imgsArrangeArr.splice(centerIndex, 1);


    // 居中centerIndex的图片
    imgsArrageCenterArr[0].pos = centerPos; 

    // 居中的图片不需要旋转
    imgsArrageCenterArr[0].rotate = 0; 
    imgsArrageCenterArr[0].isInverse = false; 
    imgsArrageCenterArr[0].isCenter = true; 

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrageTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrageTopArr.forEach((item, index) => {
      imgsArrageTopArr[index] = {
        pos: {
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotate: get30DegRandom(),
        isInverse: false,
        isCenter: false
      }
    });

    // 布局左、右两侧的图片
    for (let i = 0, len = imgsArrangeArr.length, k = len / 2; i < len; i ++) {
      let hPosRangeLORX = null;

      // 前半部分布局左边，后半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
        isInverse: false,
        isCenter: false
      };
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrageCenterArr[0]);
    if (imgsArrageTopArr && imgsArrageTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrageTopArr[0]);
    }
    

    this.setState({
      imgsArrangeArr
    });
  }

  // 组件加载以后，为每张图片计算其位置的范围
  componentDidMount = () => {
    // 舞台的大小
    const stageDOM = this.refs.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // imageFigure的大小
    const imgDOM = this.refs.imageFigure0,
      imgW = 320,
      imgH = 360,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    // 左、右区域的取值范围
    Constant.hPosRange.leftSecX[0] = -halfImgW;
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    Constant.hPosRange.y[0] = -halfImgH;
    Constant.hPosRange.y[1] = stageH - halfImgH;

    // 上侧区域的取值范围
    Constant.vPosRange.topY[0] = -halfImgH;
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    Constant.vPosRange.x[0] = halfStageW - imgW;
    Constant.vPosRange.x[1] = halfStageW;

    // 重新排布
    this.rearrange(0);
  }
  render() {
    const { imgsArrangeArr } = this.state;
    return(
      <div className="stage" ref="stage">
        <div className="img-sec">
          {
            imageDatasArr.map((item, index) => {
              if (!imgsArrangeArr[index]) {
                imgsArrangeArr[index] = {
                  pos: {
                    left: 0,
                    top: 0
                  },
                  rotate: 0,
                  isInverse: false,
                  isCenter: false
                }
              }
              return (         
                <ImageFigure key={index} ref={`imageFigure${index}`} data={item} arrage={imgsArrangeArr[index]} inverse={()=>this.inverse(index)} center={()=>this.center(index)}/>               
              )
            })
          }
        </div>
        <ControllerUnit arrange={imgsArrangeArr} inverse={(index)=>this.inverse(index)} center={(index)=>this.center(index)}/>
      </div>
    );
  }
}

export default Gallery;