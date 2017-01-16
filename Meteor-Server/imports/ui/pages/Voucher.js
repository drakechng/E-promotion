import React from 'react'

export default React.createClass({
  render() {
    const { value, validTime } = this.props.params
    return (
      <div>
        <h2>{"S$"+value} / {validTime}</h2>
      </div>
    )
  }
})
