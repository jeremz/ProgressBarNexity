import React, { Component } from 'react'
import updateRequest from './UpdateRequest'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      progressBarValue: 0,
      buttonValue: 1
    }
  }

  //Update function
  updateProgressBar = () => {
    updateRequest()
    .then(
      data => this.setState({
        progressBarValue : data.progress
      })
    ).catch(error => console.log(error))
  }

  //increment function
  increment = () => {
    if(this.state.progressBarValue < 100){
      this.setState((prevState) => ({
        progressBarValue: prevState.progressBarValue + this.state.buttonValue
      }))
    }
  }

  //decrement function
  decrement = () => {
    if(this.state.progressBarValue > 0){
      this.setState((prevState) => ({
        progressBarValue: prevState.progressBarValue - this.state.buttonValue
      }))
    }
  }
  
  render () {
    return (
      <div className='progress-bar-wrapper'>
        <div className='progress-bar-content' >
          <div className='progress-bar'> 
            <div className='progress-bar-fill' style={{
              width: `${this.state.progressBarValue}%`
            }} />
          </div>
          <div className='progress-bar-text'>
            <p>{this.state.progressBarValue} %</p>
          </div>
        </div>
        <button className='increment' onClick={ this.increment }><p>+</p></button>
        <button className='decrement' onClick={ this.decrement }><p>-</p></button>
        <button className='update' onClick={ this.updateProgressBar }><p>UPDATE</p></button>
      </div>
    )
  }
}
