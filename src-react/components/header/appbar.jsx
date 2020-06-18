import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import MainMenu from './menu';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { bindActionCreators } from 'redux';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
        // [theme.breakpoints.up('sm')]: {},
    },
    inputRoot: {
        color: 'inherit',
    },
    sectionDesktop: {
        display: 'flex',
    },
});

const menuId = 'scandicraft-main-menu';

class MainAppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };

        this.menuRef = React.createRef();
    }

    setAnchorEl(anchorEl) {
        this.setState({
            ...this.state,
            anchorEl: anchorEl
        })
    }

    handleProfileMenuOpen = (event) => {
        this.setAnchorEl(event.currentTarget);
    };

    handleMenuClose = () => {
        this.setAnchorEl(null);
    }

    openMenu() {
        this.menuRef.current.toggleDrawer(true);
    }

    onLogoutClick() {
        //Close menu
        this.handleMenuClose();

        //logout
        this.props.logout();
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.grow} >
                <MainMenu ref={this.menuRef} />

                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.openMenu.bind(this)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} color={"textSecondary"} variant="h4" noWrap>
                            ScandiCraft
                    </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="settings" color="inherit">
                                <SettingsIcon />
                            </IconButton>
                            <IconButton aria-label="show 1 new notifications" color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorEl)}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.onLogoutClick.bind(this)}>Se déconnecter</MenuItem>
                </Menu>

            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainAppBar));