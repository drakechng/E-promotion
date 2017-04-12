import React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import {createContainer} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import estampsData from "../../../api/estamps/estampsData";
import {browserHistory} from "react-router";
import RenderEstamp from './renderEstamp'
import PageBase from "../PageBase";
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

  render() {
    return (
      <PageBase title="Estamps Management"
        navigation="Application / Estamps Management"
      >
        <div>
          <List>
            <ListItem primaryText='Create' onTouchTap={this.create}/>
            <Divider />
            {
              this.props.estamps.map(estamp=>
                <RenderEstamp key = {estamp._id} estamp ={estamp} method = {()=>browserHistory.push('/estampsUpdate/' + estamp._id)}/>
              )
            }
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
