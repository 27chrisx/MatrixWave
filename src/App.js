import React, { Component } from 'react'
import Control from './Components/Control'
import Board from './Components/Board'
import Label from './Components/Label'
import './App.css'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      dataSet1: this.dataSet(),
      dataSet2: this.dataSet(),
      stepNum: [],
      moveNum: [],
      stepChange: [],
      moveChange: []
    }
  }

  componentDidMount() {
    this.stepNum()
    this.stepChange()
    this.moveNum()
    this.moveChange()
  }

  //生成随机字符串数据
  dataSet = () => {
    let dataSet = []
    for(let i = 0;i < 5000;i++){
      let dataUnit = []
      let num = Math.ceil(Math.random() * 100 % 8)
      for(let j = 0;j < num;j++){
        dataUnit[j] = Math.ceil(Math.random() * 100 % 26)
        while(j !== 0 && dataUnit[j] === dataUnit[j - 1]){
          dataUnit[j] = Math.ceil(Math.random() * 100 % 26)
        }
      }
      dataSet[i] = dataUnit
    }
    console.log(dataSet)
    return dataSet
  }

  //函数处理每步总值
  stepNum = () => {
    let stepNum = []
    for(let i = 0;i < 8;i++){
      let oneStep = []
      for(let j = 0;j < 26;j++){
        oneStep[j] = 0
        this.state.dataSet1.map((dataUnit) => {
          if(dataUnit[i] === j + 1){
            oneStep[j]++
          }
          return null
        })
        this.state.dataSet2.map((dataUnit) => {
          if(dataUnit[i] === j + 1){
            oneStep[j]++
          }
          return null
        })
      }
      oneStep[26] = 0
      this.state.dataSet1.map((dataUnit) => {
        if(dataUnit[i] === undefined && dataUnit[i - 1] !== undefined){
          oneStep[26]++
        }
        return null
      })
      this.state.dataSet2.map((dataUnit) => {
        if(dataUnit[i] === undefined && dataUnit[i - 1] !== undefined){
          oneStep[26]++
        }
        return null
      })
      stepNum[i] = oneStep
    }
    console.log(stepNum)
    this.setState({stepNum: stepNum})
  }

  //函数处理转步总值
  moveNum = () => {
    let moveNum = []
    for(let i = 0;i < 7;i++){
      let oneStepMove = []
      for(let j = 0;j < 26;j++){
        let oneStartMove = []
        for(let k = 0;k < 26;k++){
          oneStartMove[k] = 0
          this.state.dataSet1.map((dataUnit) => {
            if(dataUnit[i] === j + 1 && dataUnit[i + 1] === k + 1){
              oneStartMove[k]++
            }
            return null
          })
          this.state.dataSet2.map((dataUnit) => {
            if(dataUnit[i] === j + 1 && dataUnit[i + 1] === k + 1){
              oneStartMove[k]++
            }
            return null
          })
        }
        oneStartMove[26] = 0
        this.state.dataSet1.map((dataUnit) => {
          if(dataUnit[i] === j + 1 && dataUnit[i + 1] === undefined){
            oneStartMove[26]++
          }
          return null
        })
        this.state.dataSet2.map((dataUnit) => {
          if(dataUnit[i] === j + 1 && dataUnit[i + 1] === undefined){
            oneStartMove[26]++
          }
          return null
        })
        oneStepMove[j] = oneStartMove
      }
      moveNum[i] = oneStepMove
    }
    console.log(moveNum)
    this.setState({moveNum: moveNum})
  }

  //函数处理每步变化
  stepChange = () => {
    let stepChange = []
    for(let i = 0;i < 8;i++){
      let oneStep1 = []
      let oneStep2 = []
      let oneStepChange = []
      for(let j = 0;j < 26;j++){
        oneStep1[j] = 0
        oneStep2[j] = 0
        this.state.dataSet1.map((dataUnit) => {
          if(dataUnit[i] === j + 1){
            oneStep1[j]++
          }
          return null
        })
        this.state.dataSet2.map((dataUnit) => {
          if(dataUnit[i] === j + 1){
            oneStep2[j]++
          }
          return null
        })
      }
      oneStep1[26] = 0
      oneStep2[26] = 0
      this.state.dataSet1.map((dataUnit) => {
        if(dataUnit[i] === undefined && dataUnit[i - 1] !== undefined){
          oneStep1[26]++
        }
        return null
      })
      this.state.dataSet2.map((dataUnit) => {
        if(dataUnit[i] === undefined && dataUnit[i - 1] !== undefined){
          oneStep2[26]++
        }
        return null
      })
      for(let j = 0;j < 27;j++){
        if(oneStep1[j] === 0 && oneStep2[j] === 0){
          oneStepChange[j] = 'blank'
        }else if(oneStep1[j] === 0){
          oneStepChange[j] = 'infinite'
        }else{
          oneStepChange[j] = (oneStep2[j] / oneStep1[j] - 1).toFixed(5)
        }
      }
      stepChange[i] = oneStepChange
    }
    console.log(stepChange)
    this.setState({stepChange: stepChange})
  }
  
  //函数处理转步变化
  moveChange = () => {
    let moveChange = []
    for(let i = 0;i < 7;i++){
      let oneStepChange = []
      for(let j = 0;j < 26;j++){
        let oneStartMove1 = []
        let oneStartMove2 = []
        let oneStartChange = []
        for(let k = 0;k < 26;k++){
          oneStartMove1[k] = 0
          oneStartMove2[k] = 0
          this.state.dataSet1.map((dataUnit) => {
            if(dataUnit[i] === j + 1 && dataUnit[i + 1] === k + 1){
              oneStartMove1[k]++
            }
            return null
          })
          this.state.dataSet2.map((dataUnit) => {
            if(dataUnit[i] === j + 1 && dataUnit[i + 1] === k + 1){
              oneStartMove2[k]++
            }
            return null
          })
        }
        oneStartMove1[26] = 0
        oneStartMove2[26] = 0
        this.state.dataSet1.map((dataUnit) => {
          if(dataUnit[i] === j + 1 && dataUnit[i + 1] === undefined){
            oneStartMove1[26]++
          }
          return null
        })
        this.state.dataSet2.map((dataUnit) => {
          if(dataUnit[i] === j + 1 && dataUnit[i + 1] === undefined){
            oneStartMove1[26]++
          }
          return null
        })
        for(let k = 0;k < 27;k++){
          if(oneStartMove1[k] === 0 && oneStartMove2[k] === 0){
            oneStartChange[k] = 'blank'
          }else if(oneStartMove1[k] === 0){
            oneStartChange[k] = 'infinite'
          }else{
            oneStartChange[k] = (oneStartMove2[k] / oneStartMove1[k] - 1).toFixed(5)
          }
        }
        oneStepChange[j] = oneStartChange
      }
      moveChange[i] = oneStepChange
    }
    console.log(moveChange)
    this.setState({moveChange: moveChange})
  }

  // 渲染图像
  render () {
    return (
            <div>
            <Control/>
            <Board/>
            <Label/>
            </div>
    )
  }
}
