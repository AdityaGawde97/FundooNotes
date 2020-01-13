import React from 'react';
import Flogo from '../images/keepLogo.png'
import Settings from './Settings'
import SearchBar from './SearchBar'
import DrawerMenu from "./DrawerMenu";
import { AppBar, Toolbar, IconButton, Typography, Divider } from '@material-ui/core/';
import { Search, Refresh } from '@material-ui/icons';
import { ViewAgendaOutlined, DashboardOutlined } from '@material-ui/icons';
import { Card, CardContent, Button, Avatar, Popover } from '@material-ui/core';
import { connect } from 'react-redux';
import { useStyles, GrayTooltip, AvatarTooltip } from "../CSS/NavBarCss";
import { toggleGridView, toggleListView } from "../Redux/ListGridView/ViewAction";
import firebase from "../Firebase/FirebaseConfig";

function Navbar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState('Notes');

    const handleAvatarClick = event => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleAvatarClose = () => {
        setAnchorEl(null);
    };

    const openProfile = Boolean(anchorEl);
    const id = openProfile ? 'simple-popover' : undefined;

    const profileView = (
    <Popover
        className={classes.avatarPopover}
        id={id}
        open={openProfile}
        anchorEl={anchorEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        <Card className={classes.card}>
            <Avatar className={classes.profileAvatar}>{localStorage.getItem('firstLetter')}</Avatar>
            <CardContent>
                <Typography  variant="h6" style={{textAlign: 'center'}}>
                    {localStorage.getItem('firstName')+ ' ' + localStorage.getItem('lastName')}
                </Typography>
                <Typography variant="h6" color="textSecondary" style={{textAlign: 'center', fontSize: 15}} >
                    {localStorage.getItem('emailId')}
                </Typography>
                <Button 
                    color="primary"
                    style={
                    {
                        color: '#404040',
                        border: '1px solid lightgray',
                        borderRadius: 100,
                        textAlign: 'center',
                        marginTop: 20,
                        fontSize: 13
                    }
                    }
                >
                    Manage Your Fundoo Account
                </Button>
                <Divider style={{marginTop: 20}} />
                <Button 
                    style={
                    {
                        border: '1px solid lightgray', 
                        marginTop: 20, 
                        marginLeft: 80, 
                        color:'#404040'
                    }
                    }
                    onClick={ 
                    () => {
                        firebase.auth().signOut().then( (success) => {
                        localStorage.setItem('isAuthenticate', false)
                        props.DashboardProps.history.push('/');
                        localStorage.clear();
                        } ).catch((error) => {});
                    }
                    }
                >
                    Sign Out
                </Button>
            </CardContent>
            </Card>
    </Popover>
    );

    const fundoo = (
        <span>
            <span style={{color: '#4285F4'}}>F</span>
            <span style={{color: '#DB4437'}}>u</span>
            <span style={{color: '#F4B400'}}>n</span>
            <span style={{color: '#4285F4'}}>d</span>
            <span style={{color: '#0F9D58'}}>o</span>
            <span style={{color: '#DB4437'}}>o</span>
        </span>
    );

    const SetState= (text) => {
        setState(text)
    }

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="inherit" className={classes.appbar}>
                <Toolbar>
                    <DrawerMenu DashboardProps = {props.DashboardProps}
                        State = {state}
                        changeTitle = {SetState}
                    />
                    <img 
                        alt="fundoo logo" 
                        src={Flogo} width="32px" 
                        height="32px" 
                        className={ state === 'Notes' ? classes.logo : classes.logoOther} 
                    />
                    <Typography className={state === 'Notes' ? classes.title : classes.titleOthers} variant="h6"  noWrap>
                        { state === 'Notes' || state === 'Edit labels' ? fundoo : state }
                    </Typography>

                    <SearchBar />

                    <div className={classes.grow} />
                        <div>
                            <GrayTooltip title="Search">
                                <IconButton className={classes.searchIconSm}>
                                    <Search />
                                </IconButton>
                            </GrayTooltip>

                            <GrayTooltip title="Refresh">
                                <IconButton 
                                    onClick={ () => {
                                            let refresh = document.getElementById('refresh');
                                            refresh.style.transform = 'rotate(360deg)';
                                            refresh.style.transition = 'transform .50s ease-in-out';
                                            setTimeout(window.location.reload(false), 1000) ;
                                        }
                                    } id="refresh"
                                >
                                    <Refresh />
                                </IconButton>
                            </GrayTooltip>

                            <GrayTooltip title={ props.toggleView ? "Grid View" : "List View" }>
                                <IconButton className={classes.listAndGrid}
                                    onClick={ !props.toggleView ? props.toggleListView : props.toggleGridView }>
                                    { props.toggleView ? <DashboardOutlined /> : <ViewAgendaOutlined />}
                                </IconButton>
                            </GrayTooltip>

                            <Settings />

                            <AvatarTooltip
                                title={
                                    <React.Fragment>
                                        <span >Fundoo Account </span><br />
                                        <span style={{color: 'lightgray'}}>
                                            {localStorage.getItem('firstName')+ ' ' + localStorage.getItem('lastName')}
                                        </span><br />
                                        <span style={{color: 'lightgray'}}>{localStorage.getItem('emailId')}</span>
                                    </React.Fragment>
                                }
                            >
                                <IconButton onClick={handleAvatarClick}>
                                    <Avatar className={classes.avtar} >{localStorage.getItem('firstLetter')}</Avatar>
                                </IconButton>
                            </AvatarTooltip>

                        </div>
                </Toolbar>
            </AppBar>
            {profileView}
        </div>
    );
}

const mapToStateProps = state => {
    return {
        toggleView: state.view.toggleView

    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleListView: () => dispatch(toggleListView()),
        toggleGridView: () => dispatch(toggleGridView())
    }
}

export default connect(mapToStateProps, mapDispatchToProps)(Navbar)