import React, { Component } from 'react'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      progressBarValue: 50
    }
  }
  componentDidMount(){

  }

  render () {
    //increment function
    this.increment = (value) => {
      if(this.state.progressBarValue < 100){
        this.setState((prevState) => ({
          progressBarValue: prevState.progressBarValue + value
        }))
      }
    }
    //decrement function
    this.decrement = (value) => {
      if(this.state.progressBarValue > 0){
        this.setState((prevState) => ({
          progressBarValue: prevState.progressBarValue - value
        }))
      }
    }

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
        <button className='increment' onClick={ () => this.increment(1) }><p>+</p></button>
        <button className='decrement' onClick={ () => this.decrement(1) }><p>-</p></button>
      </div>
    )
  }
}
