import React, {PropTypes} from "react";
import Drawer from "material-ui/Drawer";
import {spacing, typography} from "material-ui/styles";
import {white, blue600} from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import NavLink from "../layouts/NavLink";
import {createContainer} from "meteor/react-meteor-data";
import {Settings} from "../../api/settings/settings";

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 22,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: blue600,
        paddingLeft: 40,
        height: 56,
    },
    menuItem: {
        color: white,
        fontSize: 14
    },
    avatar: {
        div: {
            padding: '15px 0 20px 15px',
            backgroundImage: 'url(/images/material_bg.png)',
            height: 45
        },
        icon: {
            float: 'left',
            display: 'block',
            marginRight: 15,
            boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
        },
        span: {
            paddingTop: 12,
            display: 'block',
            color: 'white',
            fontWeight: 300,
            textShadow: '1px 1px #444'
        }
    }
};
class LeftDrawer extends React.Component {
    render(){
    if (!this.props.settings) {
        if (this.props.ready) {
            Meteor.call('settings.upsert', "", 1, "", "", false)
        }
        return false;
    }

    let {navDrawerOpen} = this.props;

    if(!this.props.imageReady)
    {
      return false;
    }
    let imageUrl = this.props.settings.photo?this.props.settings.photo.getFileRecord().url():'default_profile.png';
    return (
        <Drawer
            docked={true}
            open={navDrawerOpen}>
            <div style={styles.logo}>
                E-promotion
            </div>
            <div style={styles.avatar.div}>
                <Avatar src={imageUrl}
                        size={50}
                        style={styles.avatar.icon}/>
                <span style={styles.avatar.span}>{this.props.settings.company_name}</span>
            </div>
            <div>
                {this.props.menus.map((menu, index) =>
                    <MenuItem
                        key={index}
                        style={styles.menuItem}
                        primaryText={menu.text}
                        leftIcon={menu.icon}
                        containerElement={<NavLink to={menu.link}/>}
                    />
                )}
            </div>
        </Drawer>
    )}
};

LeftDrawer.propTypes = {
    navDrawerOpen: PropTypes.bool,
    menus: PropTypes.array,
    username: PropTypes.string,
};

export default createContainer(() => {
    const sub = Meteor.subscribe('settings');
    const image = Meteor.subscribe('images');
    return {
        settings: Settings.findOne(),
        ready: sub.ready(),
        imageReady :image.ready()
    };
}, LeftDrawer);
