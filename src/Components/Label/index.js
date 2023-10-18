import React, { Component } from 'react'
import './index.css'

export default class Label extends Component {
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
      item: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'OUT']
    }
  }

  render() {
    return (
            <div className='divLabel' >
            <svg id='table3' className='table' >
              {/* <line x1='0' y1='0' x2='340' y2='800' style={{ stroke: 'rgb(75, 43, 0)', strokeWidth: '1.5' }}/> */}
              <text x='30' y='40' fill='rgb(75, 43, 0)' style={{ fontSize: '15' }}>Node encodings</text>
              <text x='30' y='190' fill='rgb(75, 43, 0)' style={{ fontSize: '15' }}>Link encodings</text>
              <text x='18' y='87' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{this.props.stepMinNum === 0 ? 1 : this.props.stepMinNum}</text>
              <text x='260' y='87' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{this.props.stepMaxNum}</text>
              <text x='5' y='145' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{Math.floor(this.props.stepMinChange) * 100}%</text>
              <text x='256' y='145' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{Math.ceil(this.props.stepMaxChange) * 100}%</text>
              <text x='18' y='237' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{this.props.moveMinNum === 0 ? 1 : this.props.moveMinNum}</text>
              <text x='260' y='237' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{this.props.moveMaxNum}</text>
              <text x='5' y='280' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{Math.floor(this.props.moveMinChange) * 100}%</text>
              <text x='256' y='280' fill='rgb(75, 43, 0)' style={{ fontSize: '13.5' }}>{Math.ceil(this.props.moveMaxChange) * 100}%</text>
              <text x='30' y='320' fill='rgb(75, 43, 0)' style={{ fontSize: '15' }}>Items</text>
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                  return (
                    <rect key={String(id)} x={String(41 + 22 * id)} y={String(80 - 3 * id)} width='12' height={String(6 * id + 6)} style={{ fill: 'none', stroke: 'rgb(75, 43, 0)', strokeWidth: '1.5' }}></rect>
                  )
                })
              }
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                  return (
                    <rect key={String(id)} x={String(56 + 20 * id)} y='134' width='11' height='11' style={{ fill: this.state.color[id], stroke: 'rgb(75, 43, 0)', strokeWidth: '1' }}></rect>
                  )
                })
              }
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                  return (
                    <rect key={String(id)} x={String(43 + (12.5 + id) * id)} y={String(230 - 0.5 * id)} width={String(0.6 * id + 4.5)} height={String(0.6 * id + 4.5)} style={{fill: '#1e1e1e' }}></rect>
                  )
                })
              }
              {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                  return (
                    <rect key={String(id)} x={String(56 + 20 * id)} y='269' width='11' height='11' style={{ fill: this.state.color[id], stroke: 'rgb(75, 43, 0)', strokeWidth: '1' }}></rect>
                  )
                })
              }
              {
                this.state.itemColor.map((color, index) => {
                  return (
                    <rect key={color} x={String(35 + Math.floor(index / 9) * 95)} y={String(341 + Math.floor(index % 9) * 40)} width='11' height='11' style={{ fill: color, stroke: 'rgb(75, 43, 0)', strokeWidth: '1' }}></rect>
                  )
                })
              }
              {
                this.state.item.map((item, index) => {
                  return (
                    <text key={item} x={String(60 + Math.floor(index / 9) * 95)} y={String(353 + Math.floor(index % 9) * 40)} fill='rgb(75, 43, 0)' style={{ fontSize: '15' }}>{item}</text>
                  )
                })
              }
            </svg>
            </div>
    )
  }
}
