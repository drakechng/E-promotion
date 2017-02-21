/**
 * Created by 128183 on 1/18/2017.
 */
import React from "react";

export default React.createClass({
    render() {
        const {title, desc, value, fromDate, toDate} = this.props.params
        return (
            <div>
                <h2>{title} / {desc} / {value} / {fromDate} / {toDate}</h2>
            </div>
        )
    }
})
