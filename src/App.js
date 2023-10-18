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
      moveChange: [],
      all: 1000,
      stepMaxNum: null,
      stepMinNum: null,
      moveMaxChange: null,
      moveMinChange: null,
      stepMaxChange: null,
      stepMinChange: null,
      steps: 7
    }
  }

  componentDidMount() {
    this.stepNum()
    this.stepChange()
    this.moveNum()
    this.moveChange()
  }

  //生成随机字符串数据(1~26)
  dataSet = () => {
    let dataSet = []
    for(let i = 0;i < 1000;i++){
      let dataUnit = []
      let num = Math.ceil(cauchyRandom(0.5, 0.5) * 100 % 7)
      while(num > 1 && Math.random() > 0.98 - 0.12 * num){
        num--
      }
      for(let j = 0;j < num;j++){
        dataUnit[j] = Math.ceil(cauchyRandom(0.05 + 0.053 * Math.floor(Math.random() * 100 % 5), 0.002 * Math.ceil(Math.random() * 100 % 3)) * 100 % 27)
        while(j !== 0 && (dataUnit[j] % (j === 1 ? 1 : (j - 1)) !== 0 || dataUnit[j] > 26 || dataUnit[j] === 0 || dataUnit[j] === dataUnit[j - 1])){
          dataUnit[j] = Math.ceil(cauchyRandom(0.05 + 0.053 * Math.floor(Math.random() * 100 % 5), 0.002 * Math.ceil(Math.random() * 100 % 3)) * 100 % 27)
        }
      }
      dataSet[i] = dataUnit
    }
    return dataSet
    function cauchyRandom(a, b) {
      let u,cauchy;
      u = Math.random();
      cauchy = a - b / Math.tan(Math.PI * u);
      return cauchy.toFixed(2);
    }
  }

  //函数处理每步总值(0~25+26)
  stepNum = () => {
    let stepMaxNum = 0
    let stepMinNum = this.state.all
    let stepNum = []
    for(let i = 0;i < this.state.steps;i++){
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
      oneStep.map((obj) => {
        if(obj > stepMaxNum){
          stepMaxNum = obj
        }
        if(obj < stepMinNum){
          stepMinNum = obj
        }
        return null
      })
      stepNum[i] = oneStep
    }
    this.setState({
      stepNum: stepNum,
      stepMaxNum: stepMaxNum,
      stepMinNum: stepMinNum
    })
  }

  //函数处理转步总值(0~25+26)
  moveNum = () => {
    let moveMaxNum = 0
    let moveMinNum = this.state.all
    let moveNum = []
    for(let i = 0;i < this.state.steps - 1;i++){
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
        oneStartMove.map((obj) => {
          if(obj > moveMaxNum){
            moveMaxNum = obj
          }
          if(obj < moveMinNum){
            moveMinNum = obj
          }
          return null
        })
      }
      moveNum[i] = oneStepMove
    }
    this.setState({
      moveNum: moveNum,
      moveMaxNum: moveMaxNum,
      moveMinNum: moveMinNum
    })
  }

  //函数处理每步变化(0~25+26)
  stepChange = () => {
    let stepMaxChange = 0
    let stepMinChange = 0
    let stepChange = []
    for(let i = 0;i < this.state.steps;i++){
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
      oneStepChange.map((change) => {
        if(change > stepMaxChange && change !== 'blank' && change !== 'infinite'){
          stepMaxChange = change
        }
        if(change < stepMinChange && change !== 'blank' && change !== 'infinite'){
          stepMinChange = change
        }
        return null
      })
      stepChange[i] = oneStepChange
    }
    this.setState({
      stepChange: stepChange,
      stepMaxChange: stepMaxChange,
      stepMinChange: stepMinChange
    })
  }
  
  //函数处理转步变化(0~25+26)
  moveChange = () => {
    let moveMaxChange = 0
    let moveMinChange = 0
    let moveChange = []
    for(let i = 0;i < this.state.steps - 1;i++){
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
            oneStartMove2[26]++
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
        oneStartChange.map((change) => {
          if(change > moveMaxChange && change !== 'blank' && change !== 'infinite'){
            moveMaxChange = change
          }
          if(change < moveMinChange && change !== 'blank' && change !== 'infinite'){
            moveMinChange = change
          }
          return null
        })
        oneStepChange[j] = oneStartChange
      }
      moveChange[i] = oneStepChange
    }
    this.setState({
      moveChange: moveChange,
      moveMaxChange: moveMaxChange,
      moveMinChange: moveMinChange
    })
  }

  //刷新
  refresh = () => {
    this.setState({
      dataSet1: this.dataSet(),
      dataSet2: this.dataSet()
    })
    this.stepNum()
    this.stepChange()
    this.moveNum()
    this.moveChange()
  }

  //更改步数
  changeSteps = () => {
    let select = document.getElementById('stepNumbers')
    let index = select.selectedIndex
    this.setState({
      steps: select.options[index].value
    })
    this.stepNum()
    this.stepChange()
    this.moveNum()
    this.moveChange()
  }

  // 渲染图像
  render () {
    return (
            <div>
            <Control
            refresh={this.refresh}
            changeSteps={this.changeSteps}/>
            <Board
            stepNum={this.state.stepNum}
            moveNum={this.state.moveNum}
            stepChange={this.state.stepChange}
            moveChange={this.state.moveChange}
            stepMaxNum={this.state.stepMaxNum}
            stepMinNum={this.state.stepMinNum === 0 ? 1 : this.state.stepMinNum}
            moveMaxNum={this.state.moveMaxNum}
            moveMinNum={this.state.moveMinNum === 0 ? 1 : this.state.moveMinNum} 
            stepMaxChange={this.state.stepMaxChange}
            stepMinChange={this.state.stepMinChange}
            moveMaxChange={this.state.moveMaxChange}
            moveMinChange={this.state.moveMinChange}
            steps={this.state.steps}/>
            <Label
            stepMaxNum={this.state.stepMaxNum}
            stepMinNum={this.state.stepMinNum}
            moveMaxNum={this.state.moveMaxNum}
            moveMinNum={this.state.moveMinNum} 
            stepMaxChange={this.state.stepMaxChange}
            stepMinChange={this.state.stepMinChange}
            moveMaxChange={this.state.moveMaxChange}
            moveMinChange={this.state.moveMinChange}/>
            </div>
    )
  }
}
