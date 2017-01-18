import React from 'react'

export default React.createClass({
  render() {
    const { title, desc, value, fromDate, toDate } = this.props.params
    return (
      <div>
        <h2>{title} / {desc} / {"S$"+value} / {fromDate} / {toDate}</h2>
      </div>
    )
  }
})
