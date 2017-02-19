import React from 'react';
/**
 * Created by fruittec on 18/2/17.
 */
export default class HiddenField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    componentDidMount() {
        this.props.onChange(this.state.value);
    }
    render() {
        return null;
    }
}