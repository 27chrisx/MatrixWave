import React, { Component } from 'react'
import './index.css'

export default class Control extends Component {
  render() {
    return (
            <div className='divControl' >
              <h3 className='console'>Console</h3>
              <p className='refresh'>Refresh the Data</p>
              <button className='refreshButton' onClick={this.props.refresh}>Refresh</button>
              <p className='stepNumber'>Number of Steps</p>
              <select id='stepNumbers' className='stepNumbers' onClick={this.props.changeSteps} onChange={this.props.changeSteps}>
                <option value={7}>seven</option>
                <option value={6}>six</option>
                <option value={5}>five</option>
                <option value={4}>four</option>
                <option value={3}>three</option>
                <option value={2}>two</option>
              </select>
              <p className='littleTail'>Produced by<br/><a href='https://github.com/27chrisx' style={{textDecoration:'none',textAlign:'center',color:'black'}}>© 27chrisx</a></p>
            </div>
    )
  }
}
