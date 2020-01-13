import { makeStyles, withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Tooltip } from '@material-ui/core/';

export const useStyles = makeStyles(theme => ({

    appbar: {
        boxShadow: 'none',
        borderBottom: '1px solid lightgray',
        minWidth: '336px'
    }, 

    grow: {
        flexGrow: 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft: theme.spacing(-2),
        },
    },

    titleOthers: {
        marginLeft: theme.spacing(-1),
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginLeft: theme.spacing(-2),
            fontSize: '1em',
        },
    },

    logo: {
        display : 'inline',
        marginLeft: theme.spacing(-1),
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    logoOther: {
        display : 'none'
    },

    clearIcon: {
        marginLeft: theme.spacing(1),
        position: 'absolute',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },

    inputRoot: {
        color: 'black',
        margin: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '78%',
        },
    },

    listAndGrid: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
           display: 'inline',
        },
    },

    searchIconSm: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
           display: 'inline',
        },
    },

    drawerList: {
        width: 280,
        transform: 'none',
        transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
    },

    drawer:{
        '& .MuiDrawer-paper': {
            top: '3.5em',
            [theme.breakpoints.up('sm')]: {
                top: '65px',
             },
        },
        '& .MuiPaper-elevation16':{
            boxShadow: 'none',
        },
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '& .MuiDrawer-paperAnchorDockedLeft': {
            borderRight: 'none',
        },
        transform: 'none',
        transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
    },

    listStyle: {
        '& .MuiListItem-button:hover ': {
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiListItem-button:focus ': {
            backgroundColor: '#feefc3',
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiListItem-button:active ': {
            backgroundColor: '#feefc3',
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiTypography-body1': {
            fontWeight: 500,
        },
        marginLeft: theme.spacing(0),
        transform: 'none',
        transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
    },

    listStyle2: {
        '& .MuiListItem-button:hover ': {
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiListItem-button:focus ': {
            backgroundColor: 'none',
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiListItem-button:active ': {
            backgroundColor: 'none',
            borderBottomRightRadius: '2em',
            borderTopRightRadius: '2em',
        },
        '& .MuiTypography-body1': {
            fontWeight: 500,
        },
        marginLeft: theme.spacing(0),
        transform: 'none',
        transition: 'transform .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s',
    },

    listItemStyle: {
        borderBottomRightRadius: '2em',
        borderTopRightRadius: '2em',
    },

    settings: {
        marginRight: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0),
        },
    },

    typography: {
        padding: theme.spacing(1),
    },
  
    avtar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: '31px',
        height: '31px',
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            marginRight: theme.spacing(0-2),
            width: '25px',
            height: '25px',
        },
    },
  
    avatarPopover: {
        '& .MuiTypography-body1': {
            width: 200,
            height: 200,
        },
    },
  
    profileAvatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: '100px',
      height: '100px',
      fontSize: '60px',
    },
  
    card: {
      maxWidth: 345,
      padding: 25,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: 20,
     },
    },

}));

export const GrayTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#404040',
        color: 'white',
        fontSize: theme.typography.pxToRem(12),
    },
}))(Tooltip);

export const AvatarTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#404040',
      maxWidth: 250,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);