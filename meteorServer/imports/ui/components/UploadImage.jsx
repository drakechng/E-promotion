mport React from "react";

export default class UploadImage extends React.Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.label}
                </p>
                <img src={this.props.value}/>
                <TextField
                    value={this.props.value}
                    hintText='Image Url'
                    onChange={(event) => this.props.onChange(event.target.value)}/>
                <p>
                    {this.props.errorMessage}
                </p>
            </div>
        );
    }
}
