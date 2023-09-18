import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      dataSet: []
    }
  }

  // 渲染图像
  render () {
    return (
            <div>
            <div className='divControl' >
            <svg id='table1' className='table' >
            </svg>
            </div>
            <div className='divBoard' >
            <svg id='table2' className='table' >
            </svg>
            </div>
            <div className='divLabel' >
            <svg id='table3' className='table' >
            </svg>
            </div>
            </div>
    )
  }
}
