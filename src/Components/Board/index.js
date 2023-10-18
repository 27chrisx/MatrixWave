import React, { Component } from 'react'
import * as d3 from 'd3'
import './index.css'

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      color: ['#9749f1',
              '#486aff',
              '#8cb0fd',
              '#a6ddf3',
              '#bde0ff',
              '#e7e4b7',
              '#e7d26d',
              '#e9b154',
              '#ff7d3e',
              '#ff6200'],
      itemColor: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#ffce00', '#32a487', '#b9e000', '#ff8d8d', '#ff97fc', '#67baff', '#930000', '#20d3ad', '#c364ff', '#ff0d6a', '#abaf5a', '#ffb400', '#ffd7a4', '#ff7c39', '#1f00ff', '#1489d5', '#cd00b5', '#b3d5ff', '#92ffb8', '#ffabd2', 'rgba(51,51,51,1)'],
      item: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'OUT'],        
      hintBox: null,
      hintText1: null,
      hintText2: null,
      hintLock: null,
      hintLockP: null,
      linkLine: []
    }
  }

  componentDidMount() {
    this.dataZoom()
  }

  dataZoom() {
    d3.selectAll('#svgLock')
      .call(d3.zoom().scaleExtent([1.0, 2.0]).on("zoom", zoomed))
    function zoomed({transform}) {  
      d3.select('#svgLock')
        .attr("transform", transform)
    } 
  }

  render() {
    let num = []
    for(let i = 0;i < this.props.steps;i++){
      num[i] = 0
    }
    let sum = 0
    this.props.stepNum.map((step, id) => {
      step.map((stepUnit) => {
        if(stepUnit !== 0 && stepUnit !== undefined){
          num[id]++
        }
        return null
      })
      sum += num[id]
      return null
    })
    let sumX = (this.props.steps * 62 + sum * 12) / Math.sqrt(2)
    let pointX = (1400 - sumX) / 2
    let pointY
    if(this.props.steps > 2){
      pointY = (840 - (31 + num[0] * 12) / Math.sqrt(2)) / 2 - 10
    }else{
      pointY = (840 - (31 + num[0] * 12) / Math.sqrt(2)) / 2 + 100
    }
    let points = String(pointX) + ',' + String(pointY)
    let pointSet = []
    let boxSet = []
    let blockSet = []
    let stepTypeSet = []
    let stepNum = this.props.stepNum
    let stepMaxNum = this.props.stepMaxNum
    let stepMinNum = this.props.stepMinNum
    let stepChange = this.props.stepChange
    let stepMaxChange = this.props.stepMaxChange
    let stepMinChange = this.props.stepMinChange
    let moveNum = this.props.moveNum
    let moveMaxNum = this.props.moveMaxNum
    let moveMinNum = this.props.moveMinNum
    let moveChange = this.props.moveChange
    let moveMaxChange = this.props.moveMaxChange
    let moveMinChange = this.props.moveMinChange
    let itemColor = this.state.itemColor 
    let item = this.state.item
    let hintBox = null
    let hintText1 = null
    let hintText2 = null
    let hintLock = null
    let hintLockP = null
    let this1 = this
    //计量每一步的类数并标定基本点
    num.map((num, id) => {
      pointSet[id] = {pointX, pointY}
      pointX = pointX + (62 + num * 12) / Math.sqrt(2)
      pointY = pointY + (id % 2 === 1 ? -1 : 1) * (62 + num * 12) / Math.sqrt(2)
      points = points + ' ' + String(pointX) + ',' + String(pointY)
      return null
    })
    //计算大虚线框轨迹
    for(let i = 0;i < this.props.steps - 1;i++){
      let startX = pointSet[i + 1].pointX 
      let startY = pointSet[i + 1].pointY + (i % 2 === 0 ? -1 : 1) * 31 * Math.sqrt(2)
      let longChange = num[i] * 12 / Math.sqrt(2)
      let shortChange = num[i + 1] * 12 / Math.sqrt(2)
      boxSet[i] = String(startX) + ',' + String(startY) + ' ' + String(startX + shortChange) + ',' + String(startY + (i % 2 === 0 ? -1 : 1) *  shortChange) + ' ' + String(startX + shortChange - longChange) + ',' + String(startY + (i % 2 === 0 ? -1 : 1) *  shortChange + (i % 2 === 0 ? -1 : 1) * longChange) + ' ' + String(startX - longChange) + ',' + String(startY + (i % 2 === 0 ? -1 : 1) * longChange) + ' ' + String(startX) + ',' + String(startY)
    }
    //计算每步每类矩形轨迹与颜色
    this.props.stepNum.map((step, id) => {
      let headX = pointSet[id].pointX + 31 / Math.sqrt(2)
      let headY = pointSet[id].pointY + (id % 2 === 0 ? 1 : -1) * 31 / Math.sqrt(2)
      let typeSet = []
      let k = 0
      step.map((stepUnit, key) => {
        if(stepUnit !== 0){
          let longEdge = 6 + 6 * Math.floor((stepUnit - stepMinNum) / ((stepMaxNum - stepMinNum) / 10))
          if(longEdge === 66){
            longEdge = 60
          }
          let shortEdge = 12
          let foot = String(headX) + ',' + String(headY) + ' ' + String(headX + longEdge / 2 / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * longEdge / 2 / Math.sqrt(2)) + ' ' + String(headX + longEdge / 2 / Math.sqrt(2) + shortEdge / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * (longEdge / 2 / Math.sqrt(2) - shortEdge / Math.sqrt(2))) + ' ' + String(headX - longEdge / 2 / Math.sqrt(2) + shortEdge / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? 1 : -1) * (longEdge / 2 / Math.sqrt(2) + shortEdge / Math.sqrt(2))) + ' ' + String(headX - longEdge / 2 / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? 1 : -1) * longEdge / 2 / Math.sqrt(2)) + ' ' + String(headX) + ',' + String(headY)
          let lock = String(headX - longEdge / 2 / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? 1 : -1) * longEdge / 2 / Math.sqrt(2)) + ' ' + String(headX - (31 + 12 * num[id - 1]) / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? 1 : -1) * (31 + 12 * num[id - 1]) / Math.sqrt(2))
          let hintLockFoot = null
          if(id < num.length){
            hintLockFoot = String(headX + 31 / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * 31 / Math.sqrt(2)) + ' ' + String(headX + (31 + num[id + 1] * 12) / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * (31 + 12 * num[id + 1]) / Math.sqrt(2)) + ' ' + String(headX + (31 + num[id + 1] * 12 + 12) / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * (31 + 12 * num[id + 1] - 12) / Math.sqrt(2)) + ' ' + String(headX + (31 + 12) / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * (31 - 12) / Math.sqrt(2)) + ' ' + String(headX + 31 / Math.sqrt(2)) + ',' + String(headY + (id % 2 === 0 ? -1 : 1) * 31 / Math.sqrt(2))
          }
          let change
          let number = stepUnit
          let rate
          let hintX = headX + 5
          let hintY = headY + (id % 2 === 1 ? -1 : 1) * 5
          let startPoint = [headX - (31 - 6) / Math.sqrt(2), headY + (id % 2 === 0 ? 1 : -1) * (31 + 6) / Math.sqrt(2)]
          let endPoint = [headX + (31 + 6) / Math.sqrt(2), headY + (id % 2 === 0 ? -1 : 1) * (31 - 6) / Math.sqrt(2)]
          if(stepChange[id][key] !== 'infinite'){
            rate = String((stepChange[id][key] * 100).toFixed(3)) + '%'
          }else{
            rate = stepChange[id][key]
          }
          if(stepChange[id][key] === 'infinite'){
            change = 9
          }else{
            change = Math.floor((stepChange[id][key] - Math.floor(stepMinChange)) / ((Math.ceil(stepMaxChange) - Math.floor(stepMinChange)) / 10))
            if(change > 9){
              change = 9
            }
          }
          typeSet[k++] = {foot, change, lock, key, number, rate, hintX, hintY, id, hintLockFoot, startPoint, endPoint}
          headX = headX + 12 / Math.sqrt(2)
          headY = headY + (id % 2 === 0 ? 1 : -1) * 12 / Math.sqrt(2)
        }
        return null
      })
      stepTypeSet[id] = typeSet
      return null
    })
    //计算移动次数矩形轨迹与颜色
    this.props.moveNum.map((startStep, id1) => {
      let k = 0
      let startX = pointSet[id1].pointX + 31 * Math.sqrt(2)
      let startY = pointSet[id1].pointY
      let blockUnit = []
      let floor = 0
      let addX = 0
      startStep.map((endStep, id2) => {
        let lineStartX = startX + floor * 12 / Math.sqrt(2)
        let lineStartY = startY + (id1 % 2 === 0 ? 1 : -1) * floor * 12 / Math.sqrt(2)
        let lineStartXK = lineStartX
        let lineStartYK = lineStartY
        let floorRise = 0
        let addKeyX = 0
        let number = num
        endStep.map((num, id3) => {
          if(num !== 0){
            let edge = 10.4 / Math.sqrt(2)
            let firstX = lineStartX + 0.8 * Math.sqrt(2)
            let firstY = lineStartY
            let littleEdge = (0.6 * Math.floor((num - moveMinNum) / (moveMaxNum - moveMinNum) * 10) + 4.5) / Math.sqrt(2)
            if(littleEdge > 10 / Math.sqrt(2)){
              littleEdge = 10 / Math.sqrt(2)
            }
            let littleX = firstX + (10.4 / Math.sqrt(2) - littleEdge)
            let littleY = firstY
            let foot = String(firstX) + ',' + String(firstY) + ' ' + String(firstX + edge) + ',' + String(firstY + edge) + ' ' + String(firstX + edge + edge) + ',' + String(firstY) + ' ' + String(firstX + edge) + ',' + String(firstY - edge) + ' ' + String(firstX) + ',' + String(firstY)
            let littleFoot = String(littleX) + ',' + String(littleY) + ' ' + String(littleX + littleEdge) + ',' + String(littleY + littleEdge) + ' ' + String(littleX + littleEdge + littleEdge) + ',' + String(littleY) + ' ' + String(littleX + littleEdge) + ',' + String(littleY - littleEdge) + ' ' + String(littleX) + ',' + String(littleY)
            let blockLockFoot = String(lineStartXK) + ',' + String(lineStartYK) + ' ' + String(lineStartXK + 12 * number[id1 + 1] / Math.sqrt(2)) + ',' + String(lineStartYK + (id1 % 2 === 0 ? -1 : 1) * 12 * number[id1 + 1] / Math.sqrt(2)) + ' ' + String(lineStartXK + 12 * (number[id1 + 1] + 1) / Math.sqrt(2)) + ',' + String(lineStartYK + (id1 % 2 === 0 ? -1 : 1) * 12 * (number[id1 + 1] - 1) / Math.sqrt(2)) + ' ' + String(lineStartXK + 12 / Math.sqrt(2)) + ',' + String(lineStartYK + (id1 % 2 === 0 ? 1 : -1) * 12 / Math.sqrt(2)) + ' ' + String(lineStartXK) + ',' + String(lineStartYK)
            let blockLockFootP = String(lineStartX) + ',' + String(lineStartY) + ' ' + String(lineStartX - 12 * addX / Math.sqrt(2)) + ',' + String(lineStartY + (id1 % 2 === 0 ? -1 : 1) * 12 * addX / Math.sqrt(2)) + ' ' + String(lineStartX - 12 * (addX - 1) / Math.sqrt(2)) + ',' + String(lineStartY + (id1 % 2 === 0 ? -1 : 1) * 12 * (addX + 1) / Math.sqrt(2)) + ' ' + String(lineStartX - 12 * (addX - 1 - number[id1]) / Math.sqrt(2)) + ',' + String(lineStartY + (id1 % 2 === 0 ? -1 : 1) * 12 * (addX + 1 - number[id1]) / Math.sqrt(2)) + ' ' + String(lineStartX - 12 * (addX - number[id1]) / Math.sqrt(2)) + ',' + String(lineStartY + (id1 % 2 === 0 ? -1 : 1) * 12 * (addX - number[id1]) / Math.sqrt(2)) + ' ' + String(lineStartX) + ',' + String(lineStartY)
            let change = 0
            let rate
            let startPoint = [firstX + edge / 2, firstY + (id1 % 2 === 0 ? 1 : -1) * edge / 2]
            let endPoint = [firstX + edge * 1.5, firstY + (id1 % 2 === 0 ? 1 : -1) * edge / 2]
            if(moveChange[id1][id2][id3] === 'infinite'){
              change = 9
            }else{
              change = Math.floor((moveChange[id1][id2][id3] - Math.floor(moveMinChange)) / (Math.ceil(moveMaxChange) - Math.floor(moveMinChange)) * 10)
            }
            if(change > 9){
              change = 9
            }
            if(moveChange[id1][id2][id3] !== 'infinite'){
              rate = String((moveChange[id1][id2][id3] * 100).toFixed(3)) + '%'
            }else{
              rate = moveChange[id1][id2][id3]
            }
            blockUnit[k++] = {foot, littleFoot, change, num, rate, firstX, firstY, id1, id2, id3, blockLockFoot, blockLockFootP, startPoint, endPoint}
            lineStartX = lineStartX + 12 / Math.sqrt(2)
            lineStartY = lineStartY + (id1 % 2 === 1 ? 1 : -1) * 12 / Math.sqrt(2)
            floorRise = 1
            addKeyX = 1
          }else{
            let key = 0
            moveNum[id1].map((idk) => {
              if(idk[id3] !== 0){
                key = 1
              }
              return null
            })
            if(key === 1){
              lineStartX = lineStartX + 12 / Math.sqrt(2)
              lineStartY = lineStartY + (id1 % 2 === 1 ? 1 : -1) * 12 / Math.sqrt(2)
            }
          }
          return null
        })
        floor = floor + floorRise
        if(addKeyX === 1){
          addX++
        }
        return null
      })
      blockSet[id1] = blockUnit
      return null
    })
    //画出每步每类矩形
    let stepPaint = stepTypeSet.map((typeSet, id) => {
      let this2 = this1
      let types = typeSet.map((type, num) => {
        let this3 = this2
        //每步鼠标上移调用
        function typeOver(event) {
          let this4 = this3
          hintBox = <rect x={type.hintX + 3.5} y={type.hintY + 3.5} width={250} height={50} style={{fill: '#fff', stroke: '#000', strokeWidth: '1'}}></rect>
          hintText1 = <text x={type.hintX + 10} y={type.hintY + 23} style={{fontSize: '15',fontWeight: '1000'}}>{item[type.key]}{type.id + 1}</text>
          hintText2 = <text x={type.hintX + 10} y={type.hintY + 43} style={{fontSize: '15',fontWeight: '2000'}}>number:{type.number} change:{type.rate}</text>
          hintLock = <polyline points={type.hintLockFoot} style={{fill: 'none', stroke: '#e01f54', strokeWidth: '1.6', strokeDasharray: '8,2'}}></polyline>
          stepTypeSet.map((set) => {
            set.map((obj) => {
              if(obj.id === type.id && obj.key === type.key){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 1.0
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 1.0
              }
              if((obj.id !== type.id || obj.key !== type.key) && document.getElementById(obj.id + 'B' +obj.key).style.stroke === 'black'){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 0.3
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 0.3
              }
            })
          })
          blockSet.map((set) => {
            set.map((obj) => {
              if(obj.id1 === type.id && obj.id2 === type.key){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 1.0
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 1.0
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 1.0
              }
              if((obj.id1 !== type.id || obj.id2 !== type.key) && document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.stroke === 'black'){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 0.3
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 0.3
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 0.3
              }
            })
          })
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock
          })
        }
        //每步鼠标离开调用
        function typeLeave(event) {
          let this4 = this3
          hintBox = null
          hintText1 = null
          hintText2 = null
          hintLock = null
          fresh()
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock
          })
        }
        //每步鼠标点击使用
        function typeClick(event) {
          if(type.id === 0 && document.getElementById(type.id + 'B' + type.key).style.stroke === 'black'){
            stepTypeSet[0].map((stepObj) => {
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
              if(stepObj.key === type.key){
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
              }
            })
            stepTypeSet.map((stepSet, stepSetId) => {
              if(stepSetId !== 0){
                stepSet.map((stepObj) => {
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                  blockSet[stepSetId - 1].map((blockObj) => {
                    if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                    }
                  })
                })
              }
              if(stepSetId < blockSet.length){
                blockSet[stepSetId].map((blockObj) => {
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                  if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                  }
                })
              }
            })
          }else if(type.id === 0 && document.getElementById(type.id + 'B' + type.key).style.stroke === 'blue'){
            stepTypeSet.map((set) => {
              set.map((obj) => {
                document.getElementById(obj.id + 'B' + obj.key).style.stroke = 'black'
                document.getElementById(obj.id + 'B' + obj.key).style.strokeWidth = obj.key === 26 ? '1.5' : '1'
              })
            })
            blockSet.map((set) => {
              set.map((obj) => {
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.stroke = 'black'
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeWidth = 0.2
              })
            })
          }else if(type.id !== 0 && document.getElementById(type.id + 'B' + type.key).style.stroke === 'blue'){
            alert("You shouldn't click this block if you want to change its state.")
          }else if(document.getElementById(type.id + 'B' + type.key).style.stroke === 'green'){
            let ifBlue = 0
            stepTypeSet[type.id - 1].map((stepObj) => {
              if(document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke === 'blue'){
                ifBlue = 1
              }
            })
            if(ifBlue === 0){
              alert("You should choose other blocks before this block.")
            }else{
              document.getElementById(type.id + 'B' + type.key).style.stroke = 'blue'
              document.getElementById(type.id + 'B' + type.key).style.strokeWidth = 1.5
              stepTypeSet[type.id].map((stepObj) => {
                if(document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke !== 'blue'){
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? '1.5' : '1'
                }
              })
              blockSet[type.id - 1].map((blockObj) => {
                if(document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'green' && document.getElementById(type.id + 'B' + blockObj.id3).style.stroke === 'blue'){
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'blue'
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                }
                if(document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'blue'){
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                  document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                }
              })
              stepTypeSet.map((stepSet, stepSetId) => {
                if(stepSetId > type.id){
                  stepSet.map((stepObj) => {
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                    blockSet[stepSetId - 1].map((blockObj) => {
                      if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                      }
                    })
                  })
                }
                if(stepSetId < blockSet.length && stepSetId >= type.id){
                  blockSet[stepSetId].map((blockObj) => {
                    if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                    }else{
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                    }
                  })
                }
              })
            }
            fresh()
          }else if(type.id !== 0 && document.getElementById(type.id + 'B' + type.key).style.stroke === 'black'){
            alert("You should choose a item in the first unit.")
          }
          fresh()
        }
        return <polyline key={type.id + 'B' + type.key} id={type.id + 'B' + type.key} points={type.foot} onMouseOver={typeOver} onMouseLeave={typeLeave} onClick={typeClick} style={{fill: this.state.color[type.change], fillOpacity: '1.0', stroke: 'black', strokeWidth: type.key === 26 ? '1.5' : '1', strokeOpacity: '1.0'}} />
      })
      types.key = id + 'C'
      return types
    })
    //画出移动次数彩块
    let moveColorPaint = blockSet.map((moveSet, id) => {
      let this2 = this1
      let moves = moveSet.map((move, num) => {
        let this3 = this2
        //移动鼠标上移调用
        function blockOver(event) {
          let this4 = this3
          hintBox = <rect x={move.firstX + 11} y={move.firstY + 3} width={250} height={50} style={{fill: '#fff', stroke: '#000', strokeWidth: '1'}}></rect>
          hintText1 = <text x={move.firstX + 18} y={move.firstY + 23} style={{fontSize: '15',fontWeight: '1000'}}>{item[move.id2]}{move.id1 + 1}{'->'}{item[move.id3]}{move.id1 + 2}</text>
          hintText2 = <text x={move.firstX + 18} y={move.firstY + 43} style={{fontSize: '15',fontWeight: '2000'}}>number:{move.num} change:{move.rate}</text>
          hintLock = <polyline points={move.blockLockFoot} style={{fill: 'none', stroke: '#e01f54', strokeWidth: '1.6', strokeDasharray: '8,2'}}></polyline>
          hintLockP = <polyline points={move.blockLockFootP} style={{fill: 'none', stroke: '#e01f54', strokeWidth: '1.6', strokeDasharray: '8,2'}}></polyline>
          stepTypeSet.map((set) => {
            set.map((obj) => {
              if((obj.id === move.id1 && obj.key === move.id2) || (obj.id === move.id1 + 1 && obj.key === move.id3)){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 1.0
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 1.0
              }
              if((obj.id !== move.id1 || obj.key !== move.id2) && (obj.id !== move.id1 + 1 || obj.key !== move.id3) && (document.getElementById(obj.id + 'B' +obj.key).style.stroke === 'black')){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 0.3
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 0.3
              }
            })
          })
          blockSet.map((set) => {
            set.map((obj) => {
              if(obj.id1 === move.id1 && obj.id2 === move.id2 && obj.id3 === move.id3){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 1.0
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 1.0
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 1.0
              }
              if((obj.id1 !== move.id1 || obj.id2 !== move.id2 || obj.id3 !== move.id3) && document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.stroke === 'black'){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 0.3
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 0.3
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 0.3
              }
            })
          })
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock,
            hintLockP: hintLockP
          })
        }
        //移动鼠标离开使用
        function blockLeave(event) {
          let this4 = this3
          hintBox = null
          hintText1 = null
          hintText2 = null
          hintLock = null
          hintLockP = null
          fresh()
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock,
            hintLockP: hintLockP
          })
        }
        //移动鼠标点击使用
        function blockClick(event) {
          if(move.id1 === 0 && document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'black'){
            stepTypeSet[0].map((stepObj) => {
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
              if(stepObj.key === move.id2){
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
              }
            })
            stepTypeSet[1].map((stepObj) => {
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
              if(stepObj.key === move.id3){
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
              }
            })
            blockSet[0].map((moveObj) => {
              document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'black'
              document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 0.2
              if(moveObj.id2 === move.id2 && moveObj.id3 === move.id3){
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'blue'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
              }
            })
            stepTypeSet.map((stepSet, stepSetId) => {
              if(stepSetId > 1){
                stepSet.map((stepObj) => {
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                  blockSet[stepSetId - 1].map((blockObj) => {
                    if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                    }
                  })
                })
              }
              if(stepSetId < blockSet.length && stepSetId > 0){
                blockSet[stepSetId].map((blockObj) => {
                  if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                  }else{
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                  }
                })
              }
            })
          }else if(document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'blue'){
            blockSet[move.id1].map((moveObj) => {
              if(moveObj.id2 === move.id2){
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'green'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
              }
            })
            stepTypeSet.map((stepSet, stepSetId) => {
              if(stepSetId > move.id1){
                stepSet.map((stepObj) => {
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                  blockSet[stepSetId - 1].map((blockObj) => {
                    if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                    }
                  })
                })
              }
              if(stepSetId < blockSet.length && stepSetId > move.id1){
                blockSet[stepSetId].map((blockObj) => {
                  if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                  }else{
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                  }
                })
              }
            })
          }else if(document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'green'){
            if(document.getElementById(move.id1 + 'B' + move.id2).style.stroke !== 'blue'){
              alert("You should choose other blocks before this block.")
            }else{
              stepTypeSet[move.id1 + 1].map((stepObj) => {
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
                if(stepObj.key === move.id3){
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                }
              })
              blockSet[move.id1].map((moveObj) => {
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'black'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 0.2
                if(moveObj.id2 === move.id2 && moveObj.id3 === move.id3){
                  document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'blue'
                  document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
                }
              })
              stepTypeSet.map((stepSet, stepSetId) => {
                if(stepSetId > move.id1 + 1){
                  stepSet.map((stepObj) => {
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                    blockSet[stepSetId - 1].map((blockObj) => {
                      if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                      }
                    })
                  })
                }
                if(stepSetId < blockSet.length && stepSetId > move.id1){
                  blockSet[stepSetId].map((blockObj) => {
                    if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                    }else{
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                    }
                  })
                }
              })
            }
          }else if(move.id1 !== 0 && document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'black'){
            alert("You should choose a item in the first unit.")
          }
          fresh()
        }
        return <polyline key={move.id1 + 'F' + move.id2 + 'F' + move.id3} id={move.id1 + 'F' + move.id2 + 'F' + move.id3} points={move.foot} onMouseOver={blockOver} onMouseLeave={blockLeave} onClick={blockClick} style={{fill: this.state.color[move.change], fillOpacity: '1.0', stroke: 'black', strokeWidth: '0.2', stopOpacity: '1.0' }} />
      })
      moves.key = id + 'G'
      return moves
    })
    //画出移动变化黑块
    let moveBlackPaint = blockSet.map((moveSet, id) => {
      let this2 = this1
      let moves = moveSet.map((move, num) => {
        let this3 = this2
        //移动鼠标上移调用
        function blockOver(event) {
          let this4 = this3
          hintBox = <rect x={move.firstX + 11} y={move.firstY + 3} width={250} height={50} style={{fill: '#fff', stroke: '#000', strokeWidth: '1'}}></rect>
          hintText1 = <text x={move.firstX + 18} y={move.firstY + 23} style={{fontSize: '15',fontWeight: '1000'}}>{item[move.id2]}{move.id1 + 1}{'->'}{item[move.id3]}{move.id1 + 2}</text>
          hintText2 = <text x={move.firstX + 18} y={move.firstY + 43} style={{fontSize: '15',fontWeight: '2000'}}>number:{move.num} change:{move.rate}</text>
          hintLock = <polyline points={move.blockLockFoot} style={{fill: 'none', stroke: '#e01f54', strokeWidth: '1.6', strokeDasharray: '8,2'}}></polyline>
          hintLockP = <polyline points={move.blockLockFootP} style={{fill: 'none', stroke: '#e01f54', strokeWidth: '1.6', strokeDasharray: '8,2'}}></polyline>
          stepTypeSet.map((set) => {
            set.map((obj) => {
              if((obj.id === move.id1 && obj.key === move.id2) || (obj.id === move.id1 + 1 && obj.key === move.id3)){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 1.0
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 1.0
              }
              if((obj.id !== move.id1 || obj.key !== move.id2) && (obj.id !== move.id1 + 1 || obj.key !== move.id3) && document.getElementById(obj.id + 'B' +obj.key).style.stroke === 'black'){
                document.getElementById(obj.id + 'B' +obj.key).style.fillOpacity = 0.3
                document.getElementById(obj.id + 'B' +obj.key).style.strokeOpacity = 0.3
              }
            })
          })
          blockSet.map((set) => {
            set.map((obj) => {
              if(obj.id1 === move.id1 && obj.id2 === move.id2 && obj.id3 === move.id3){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 1.0
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 1.0
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 1.0
              }
              if((obj.id1 !== move.id1 || obj.id2 !== move.id2 || obj.id3 !== move.id3) && document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.stroke === 'black'){
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.fillOpacity = 0.3
                document.getElementById(obj.id1 + 'F' + obj.id2 + 'F' + obj.id3).style.strokeOpacity = 0.3
                document.getElementById(obj.id1 + 'H' + obj.id2 + 'H' + obj.id3).style.fillOpacity = 0.3
              }
            })
          })
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock,
            hintLockP: hintLockP
          })
        }
        //移动鼠标离开使用
        function blockLeave(event) {
          let this4 = this3
          hintBox = null
          hintText1 = null
          hintText2 = null
          hintLock = null
          hintLockP = null
          fresh()
          this4.setState({
            hintBox: hintBox,
            hintText1: hintText1,
            hintText2: hintText2,
            hintLock: hintLock,
            hintLockP: hintLockP
          })
        }
        //移动鼠标点击使用
        function blockClick(event) {
          if(move.id1 === 0 && document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'black'){
            stepTypeSet[0].map((stepObj) => {
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
              if(stepObj.key === move.id2){
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
              }
            })
            stepTypeSet[1].map((stepObj) => {
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
              if(stepObj.key === move.id3){
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
              }
            })
            blockSet[0].map((moveObj) => {
              document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'black'
              document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 0.2
              if(moveObj.id2 === move.id2 && moveObj.id3 === move.id3){
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'blue'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
              }
            })
            stepTypeSet.map((stepSet, stepSetId) => {
              if(stepSetId > 1){
                stepSet.map((stepObj) => {
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                  blockSet[stepSetId - 1].map((blockObj) => {
                    if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                    }
                  })
                })
              }
              if(stepSetId < blockSet.length && stepSetId > 0){
                blockSet[stepSetId].map((blockObj) => {
                  if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                  }else{
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                  }
                })
              }
            })
          }else if(document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'blue'){
            blockSet[move.id1].map((moveObj) => {
              if(moveObj.id2 === move.id2){
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'green'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
              }
            })
            stepTypeSet.map((stepSet, stepSetId) => {
              if(stepSetId > move.id1){
                stepSet.map((stepObj) => {
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                  blockSet[stepSetId - 1].map((blockObj) => {
                    if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                      document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                    }
                  })
                })
              }
              if(stepSetId < blockSet.length && stepSetId > move.id1){
                blockSet[stepSetId].map((blockObj) => {
                  if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                  }else{
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                    document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                  }
                })
              }
            })
          }else if(document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'green'){
            if(document.getElementById(move.id1 + 'B' + move.id2).style.stroke !== 'blue'){
              alert("You should choose other blocks before this block.")
            }else{
              stepTypeSet[move.id1 + 1].map((stepObj) => {
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1
                if(stepObj.key === move.id3){
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'blue'
                  document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                }
              })
              blockSet[move.id1].map((moveObj) => {
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'black'
                document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 0.2
                if(moveObj.id2 === move.id2 && moveObj.id3 === move.id3){
                  document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.stroke = 'blue'
                  document.getElementById(moveObj.id1 + 'F' + moveObj.id2 + 'F' + moveObj.id3).style.strokeWidth = 1
                }
              })
              stepTypeSet.map((stepSet, stepSetId) => {
                if(stepSetId > move.id1 + 1){
                  stepSet.map((stepObj) => {
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'black'
                    document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = stepObj.key === 26 ? 1.5 : 1
                    blockSet[stepSetId - 1].map((blockObj) => {
                      if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke = 'green'
                        document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeWidth = 1.5
                      }
                    })
                  })
                }
                if(stepSetId < blockSet.length && stepSetId > move.id1){
                  blockSet[stepSetId].map((blockObj) => {
                    if(document.getElementById(stepSetId + 'B' + blockObj.id2).style.stroke !== 'black'){
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'green'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 1
                    }else{
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke = 'black'
                      document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeWidth = 0.2
                    }
                  })
                }
              })
            }
          }else if(move.id1 !== 0 && document.getElementById(move.id1 + 'F' + move.id2 + 'F' + move.id3).style.stroke === 'black'){
            alert("You should choose a item in the first unit.")
          }
          fresh()
        }
        return <polyline key={move.id1 + 'H' + move.id2 + 'H' + move.id3} id={move.id1 + 'H' + move.id2 + 'H' + move.id3} points={move.littleFoot} onMouseOver={blockOver} onMouseLeave={blockLeave} onClick={blockClick} style={{fill: '#1e1e1e', fillOpacity: '1.0'}} />
      })
      moves.key = id + 'I'
      return moves
    })

    function fresh() {
      let lock = 0
      stepTypeSet.map((set) => {
        set.map((stepOdj) => {
          if(document.getElementById(stepOdj.id + 'B' + stepOdj.key).style.stroke !== 'black'){
            lock = 1
          }
        })
      })
      blockSet.map((set) => {
        set.map((blockObj) => {
          if(document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
            lock = 1
          }
        })
      })
      if(lock === 1){
        let linkLine = []
        let k = 0
        stepTypeSet.map((set) => {
          set.map((stepObj) => {
            if(document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke === 'black'){
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.fillOpacity = 0.3
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeOpacity = 0.3
            }
            if(document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke !== 'black'){
              if(stepObj.id < blockSet.length){
                let rememberPoint = stepObj.endPoint
                blockSet[stepObj.id].map((blockObj) => {
                  if(blockObj.id2 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'green'){
                    linkLine[k++] = <line x1={String(rememberPoint[0])} y1={String(rememberPoint[1])} x2={String(blockObj.startPoint[0])} y2={String(blockObj.startPoint[1])} style={{fill: 'none', stroke: document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke, strokeWidth: 1}}></line>
                    rememberPoint = [blockObj.startPoint[0] + 10.4 / Math.sqrt(2), blockObj.startPoint[1] + (stepObj.id % 2 === 0 ? -1 : 1) * 10.4 / Math.sqrt(2)]
                  }
                  if(blockObj.id2 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'blue'){
                    linkLine[k++] = <line x1={String(rememberPoint[0])} y1={String(rememberPoint[1])} x2={String(blockObj.startPoint[0])} y2={String(blockObj.startPoint[1])} style={{fill: 'none', stroke: document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke, strokeWidth: 2}}></line>
                  }
                })
              }
              if(stepObj.id !== 0){
                let rememberPoint
                blockSet[stepObj.id - 1].map((blockObj) => {
                  if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'green'){
                    if(rememberPoint === undefined){
                      rememberPoint = blockObj.endPoint
                    }else{
                      linkLine[k++] = <line x1={String(rememberPoint[0])} y1={String(rememberPoint[1])} x2={String(blockObj.endPoint[0] - 10.4 / Math.sqrt(2))} y2={String(blockObj.endPoint[1] - (stepObj.id % 2 === 0 ? -1 : 1) * 10.4 / Math.sqrt(2))} style={{fill: 'none', stroke: document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke, strokeWidth: 1}}></line>
                      rememberPoint = [blockObj.endPoint[0], blockObj.endPoint[1]]
                    }
                  }
                  if(blockObj.id3 === stepObj.key && document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'blue'){
                    rememberPoint = blockObj.endPoint
                  }
                })
                linkLine[k++] = <line x1={String(rememberPoint[0])} y1={String(rememberPoint[1])} x2={String(stepObj.startPoint[0])} y2={String(stepObj.startPoint[1])} style={{fill: 'none', stroke: document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke, strokeWidth: document.getElementById(stepObj.id + 'B' + stepObj.key).style.stroke === 'blue' ? 2 : 1}}></line>
              }
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.fillOpacity = 1.0
              document.getElementById(stepObj.id + 'B' + stepObj.key).style.strokeOpacity = 1.0
            }
          })
        })
        blockSet.map((set) => {
          set.map((blockObj) => {
            if(document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke === 'black'){
              document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.fillOpacity = 0.3
              document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeOpacity = 0.3
              document.getElementById(blockObj.id1 + 'H' + blockObj.id2 + 'H' + blockObj.id3).style.fillOpacity = 0.3
            }
            if(document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.stroke !== 'black'){
              document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.fillOpacity = 1.0
              document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeOpacity = 1.0
              document.getElementById(blockObj.id1 + 'H' + blockObj.id2 + 'H' + blockObj.id3).style.fillOpacity = 1.0
            }
          })
        })
        this1.setState({linkLine: linkLine})
      }else{
        this1.setState({linkLine: []})
        stepTypeSet.map((set) => {
          set.map((stepOdj) => {
            document.getElementById(stepOdj.id + 'B' + stepOdj.key).style.fillOpacity = 1
            document.getElementById(stepOdj.id + 'B' + stepOdj.key).style.strokeOpacity = 1
          })
        })
        blockSet.map((set) => {
          set.map((blockObj) => {
            document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.fillOpacity = 1
            document.getElementById(blockObj.id1 + 'F' + blockObj.id2 + 'F' + blockObj.id3).style.strokeOpacity = 1
            document.getElementById(blockObj.id1 + 'H' + blockObj.id2 + 'H' + blockObj.id3).style.fillOpacity = 1
          })
        })
      }
    }

    return (
          <div id='divBoard' className='divBoard' >
            <svg id='svgLock' className='svgLock'>
              {/* <polyline points={points} style={{fill: 'none', stroke: 'black' }} /> */}
              {/* 大虚线框 */}
              {
                boxSet.map((box, id) => {
                  return <polyline key={id + 'A'} points={box} style={{fill: 'none', stroke: '#999', strokeWidth: '2', strokeDasharray: '10,5' }} />
                })
              }
              {this.state.hintLock}
              {this.state.hintLockP}
              {/* 每步矩形框 */}
              {stepPaint}
              {/* 标定退出线 */}
              {
                stepTypeSet.map((typeSet, id) => {
                  return <polyline key={id + 'E'} points={typeSet[typeSet.length - 1].lock} style={{fillOpacity: '0.0', stroke: '#000', strokeWidth: '1.5' }} />
                })
              }
              {/* 每个小彩格 */}
              {moveColorPaint}
              {/* 每个小黑格 */}
              {moveBlackPaint}
              {/* 选中块间的链接 */}
              {this.state.linkLine}
              {/* 步数标识 */}
              {
                pointSet.map((point ,id) => {
                  if(pointSet.length !== id){
                    return <circle key={id + 'J'} cx={String(point.pointX + 8)} cy={String(point.pointY + (id % 2 === 0 ? 1 : -1) * 8)} r='12' style={{fill: 'none', stroke: '#000', strokeWidth: '1' }}></circle>
                  }
                  return {key: id + 'J'}
                })
              }
              {
                pointSet.map((point ,id) => {
                  if(pointSet.length !== id){
                    return <text key={id + 'K'} x={String(point.pointX + 4)} y={String(point.pointY + (id % 2 === 0 ? 14 : -2))} style={{fontSize: '14'}}>{id + 1}</text>
                  }
                  return {key: id + 'K'}
                })
              }
              {/* 类别彩色圆 */}
              {
                pointSet.map((point ,id) => {
                  let startX
                  let startY
                  let mark = 0
                  let circles = []
                  if(pointSet.length !== id + 1){
                    startX = point.pointX + (num[id + 1] * 12 + 67) / Math.sqrt(2)
                    startY = point.pointY + (id % 2 === 1 ? 1 : -1) * (num[id + 1] * 12 + 17) / Math.sqrt(2)
                  }else{
                    startX = pointSet[id - 1].pointX + 22.5 * Math.sqrt(2)
                    startY = pointSet[id - 1].pointY + (id % 2 === 0 ? 1 : -1) * 3.5
                  }
                  for(let i = 0;i < num[id];i++){
                    while(stepNum[id][mark] === 0){
                      mark++
                    }
                    startX = startX + 12 / Math.sqrt(2)
                    startY = startY + (id % 2 === 0 ? 1 : -1) * 12 / Math.sqrt(2)
                    circles[i] = <circle key={id + 'L' + i} cx={String(startX)} cy={String(startY)} r='4.5' style={{fill: itemColor[mark++], stroke: '#000', strokeWidth: '0.5' }}></circle>
                  }
                  circles.key = id + 'M'
                  return circles
                })
              }
              {this.state.hintBox}
              {this.state.hintText1}
              {this.state.hintText2}
            </svg>
          </div>
    )
  }
}
