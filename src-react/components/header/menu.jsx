import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    list: {
        width: 250,
    },
});

class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    toggleDrawer(open) {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }

        this.setState({
            ...this.state,
            open: open
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment key={'main_menu_left'} >
                {/* <Button onClick={() => this.toggleDrawer(true)}>{'main_menu_left'}</Button> */}
                <Drawer anchor={'left'} open={this.state.open} onClose={() => this.toggleDrawer(false)}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    >
                        <List>
                            <ListItem button key={'play'}>
                                <ListItemIcon><InboxIcon color={'primary'} /></ListItemIcon>
                                <ListItemText primary={'Jouer'} />
                            </ListItem>
                            <ListItem button key={'wiki'}>
                                <ListItemIcon><InboxIcon color={'primary'} /></ListItemIcon>
                                <ListItemText primary={'Wiki / Nouveautés'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key={'news'}>
                                <ListItemIcon><InboxIcon color={'primary'} /></ListItemIcon>
                                <ListItemText primary={'Nouvelles'} />
                            </ListItem>
                            <ListItem button key={'sondages'}>
                                <ListItemIcon><InboxIcon color={'primary'} /></ListItemIcon>
                                <ListItemText primary={'Sondages'} />
                            </ListItem>
                            <ListItem button key={'spoils'}>
                                <ListItemIcon><InboxIcon color={'primary'} /></ListItemIcon>
                                <ListItemText primary={'Spoils'} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainMenu);