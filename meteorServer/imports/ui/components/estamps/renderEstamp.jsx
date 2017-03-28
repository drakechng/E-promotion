import React from "react";
// import ArrayComponent from 'simple-react-form-material-ui/lib/array'
import ActionDeleteForever from "material-ui/svg-icons/action/delete-forever";
import {red500} from "material-ui/styles/colors";
import FlatButton from "material-ui/FlatButton";
import HardwareKeyboardArrowUp from "material-ui/svg-icons/hardware/keyboard-arrow-up";
import HardwareKeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import {Card, CardActions, CardMedia, CardTitle} from "material-ui/Card";
import {ListItem} from "material-ui/List";
import Stamp from "../StampIcon";

const propTypes = {
    estamp: React.PropTypes.object.isRequired,
    method: React.PropTypes.func.isRequired
}

export default class renderEstamp extends React.Component {
    renderStamp(max) {
        const stampNumber = max;
        let stamp = [];
        for (i = 0; i < stampNumber; i++) {
            stamp[i] = i + 1;
        }
        return stamp.map((stamp) => (
            <Stamp style={{float:'left'}} key={stamp}/>
        ));
    }
    render() {
        const estamp = this.props.estamp
        return (
            <ListItem onTouchTap={this.props.method} key={estamp._id} className="stampCard">
                <Card style={{
                    width: '95%',
                    margin: '0 auto'
                }}>
                <CardMedia
                    overlay={
                        this.renderStamp(estamp.max)
                    }
                >
                    <img src="ui/EstampsManage/loyalty card.jpg"/>
                </CardMedia>
                <CardTitle title={estamp.title}
                    subtitle={estamp.description}
                >
                </CardTitle>
                <CardActions>
                    <FlatButton>
                        <HardwareKeyboardArrowUp/>
                    </FlatButton>
                    <FlatButton>
                        <HardwareKeyboardArrowDown/>
                    </FlatButton>
                    <ActionDeleteForever hoverColor={red500}
                        className="stampDeleteButton"/>
                </CardActions>
            </Card>
        </ListItem>
        )
    }
}
renderEstamp.propTypes = propTypes
