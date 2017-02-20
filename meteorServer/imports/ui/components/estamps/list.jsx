import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import {createContainer} from 'meteor/react-meteor-data'
import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import {Meteor} from 'meteor/meteor'
import estampsData from '../../../api/estamps/estampsData'
import {browserHistory} from 'react-router'
import Stamp from '../StampIcon';
import PageBase from '../PageBase';
const propTypes = {
    estamps: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool.isRequired
}

const defaultProps = {}

class EstampsList extends React.Component {

    constructor(props) {
        super(props)
        this.create = this.create.bind(this)
    }

    create() {
        browserHistory.push('/estampsCreate');
    }


    renderStamp(max) {
        const stampNumber = max;
        let stamp = [];
        for (i=0; i < stampNumber; i++) {
            stamp[i] = i+1;
        }
        return stamp.map((stamp) => (
            <Stamp  style={{float:'left'}} key = {stamp}/>
        ));
    }

    renderEstamps() {
        return this.props.estamps.map(estamp => {
            const onTouchTap = () => browserHistory.push('/estampsUpdate/' + estamp._id)
            return (
                <ListItem onTouchTap={()=>onTouchTap()} key={estamp._id} className="stampCard">
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
        })
    }

    render() {
        return (
            <PageBase title="Estamps Management"
                      navigation="Application / Estamps Management"
            >
              <div>
                <List>
                  <ListItem primaryText='Create' onTouchTap={this.create}/>
                    {this.renderEstamps()}
                </List>
              </div>
            </PageBase>
        )
    }

}

EstampsList.propTypes = propTypes
EstampsList.defaultProps = defaultProps

export default createContainer(() => {
    const handler = Meteor.subscribe('estamps.index')
    const isLoading = !handler.ready()
    const estamps = estampsData.find().fetch()
    return {isLoading, estamps}
}, EstampsList)
