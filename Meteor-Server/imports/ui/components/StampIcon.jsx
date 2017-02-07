import React,{Component} from  'react';
import Avatar from 'material-ui/Avatar';

const styles = {
    chip: {
        margin: 5,
    },
}

export default class Stamp extends Component {
    render() {
        return(
            <div className="stamp">
                <Avatar style={styles.chip} src="ui/EstampsManage/E-stamps1.jpg"/>
            </div>
        )
    }
}
