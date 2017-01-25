/**
 * Created by 128183 on 1/23/2017.
 */
import React from 'react'

export default React.createClass({
    render() {
        const { title, desc, date } = this.props.params
        return (
            <div>
                <h2>{title} / {desc} / {date}</h2>
            </div>
        )
    }
})