import React from 'react'
import TestRenderer from 'react-test-renderer'
import ProgressBar from './ProgressBar'
import updateRequest from './UpdateRequest'

jest.mock('./UpdateRequest', () => {
  return jest.fn(() => Promise.resolve({
    progress: 47
  }))
})

describe('ProgressBar component', () => {
  let renderer

  beforeEach(() => {
    renderer = TestRenderer.create(<ProgressBar />)
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('Should render with zero value', () => { 
    const root = renderer.root
    const instance = root.instance
    const progressBarFill = root.findByProps({ className: 'progress-bar-fill' })
    const progressBarText = root.findAllByType('p')
    
    expect(progressBarText[0].props.children).toEqual([0, ' %'])
    expect(progressBarFill.props.style).toEqual({
      width: '0%'
    })
    expect(instance.state.progressBarValue).toBe(0)
    expect(instance.state.buttonValue).toBe(1)
  })

  it('should increment by 1', () => {
    const root = renderer.root
    const increment = root.findByProps({ className: 'increment' })
    const progressBarFill = root.findByProps({ className: 'progress-bar-fill' })
    const progressBarText = root.findAllByType('p')

    increment.props.onClick()
    
    expect(progressBarText[0].props.children).toEqual([1, ' %'])
    expect(progressBarFill.props.style).toEqual({
      width: '1%'
    })
  })

  it('should not increment after 100', () => {
    const root = renderer.root
    const instance = root.instance
    instance.setState({ progressBarValue: 100 })
    const increment = root.findByProps({ className: 'increment' })
    const progressBarFill = root.findByProps({ className: 'progress-bar-fill' })
    const progressBarText = root.findAllByType('p')

    increment.props.onClick()
    
    expect(progressBarText[0].props.children).toEqual([100, ' %'])
    expect(progressBarFill.props.style).toEqual({
      width: '100%'
    })
  })
  
  it('should decrement by 1', () => {
    const root = renderer.root
    const instance = root.instance
    instance.setState({ progressBarValue: 40 })
    const decrement = root.findByProps({ className: 'decrement' })
    const progressBarFill = root.findByProps({ className: 'progress-bar-fill' })
    const progressBarText = root.findAllByType('p')

    decrement.props.onClick()
    
    expect(progressBarText[0].props.children).toEqual([39, ' %'])
    expect(progressBarFill.props.style).toEqual({
      width: '39%'
    })
  })
  
  it('should not decrement after 0', () => {
    const root = renderer.root
    const instance = root.instance
    instance.setState({ progressBarValue: 0 })
    const decrement = root.findByProps({ className: 'decrement' })
    const progressBarFill = root.findByProps({ className: 'progress-bar-fill' })
    const progressBarText = root.findAllByType('p')

    decrement.props.onClick()
    
    expect(progressBarText[0].props.children).toEqual([0, ' %'])
    expect(progressBarFill.props.style).toEqual({
      width: '0%'
    })
  })

  it('should update request', () => {
    const root = renderer.root
    const instance = root.instance
    const update = root.findByProps({ className: 'update' })

    update.props.onClick()

    expect(updateRequest).toBeCalled()
    return updateRequest().then(data => {
      expect(data.progress).toBe(47)
      expect(instance.state.progressBarValue).toBe(47)
    })
    
  })
}) 