import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({

    root: {
        display: 'flex',
        padding: theme.spacing(0, 1.5),
        paddingTop: theme.spacing(0.5),
        flexDirection: "column",
        width: 210,
        maxWidth: 210,
        height: 'fit-content',
        borderRadius: '8px',
        boxShadow:'none',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(1.5),
        minHeight: '60px',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            maxWidth: '90%',
            marginLeft: theme.spacing(-1),
            marginRight: theme.spacing(0),
        },
    },

    rootList:{
        maxWidth: '95%',
        width: '95%',
    },

    noteTaker:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'nowrap',
        justifyContent: "space-between",
        width: 210,
        maxWidth: 210,
        border: 'none',
        boxShadow:'none',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },

    paperList:{
        display: 'flex',
        flexWrap: 'nowrap',
        maxWidth: '95%',
        width: '95%',
    },

    chipPaper:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        width: 210,
        maxWidth: 210,
        border: 'none',
        boxShadow:'none',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },

    noteTitle: {
        marginLeft: theme.spacing(0),
        paddingTop: theme.spacing(0.5),
        flex: 1,
        wordBreak: 'break-all',
        fontSize: '1rem',
        letterSpacing: '.00625em',
        fontWeight: 500,
        lineHeight: '1.5rem',
    },

    noteContent: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        wordBreak: 'break-all',
        fontSize: '.875rem',
        fontWeight: 400,
        maxWidth: '95%',
        width: '95%',
        letterPpacing: '.01428571em',
        lineHeight: '1.25rem',
        flex: 1,
    },

    iconButton: {
        width:'32px',
        height: '32px',
        margin: theme.spacing(0.5, 0),
        paddingTop: 5,
        marginLeft: theme.spacing(0),
        color: '#545454',
    },

    pinButton: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
    },

    pinButtonList: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
        position: 'absolute',
        marginLeft: theme.spacing(62),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(56),
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(10),
        },
    },

    pinIcon: {
        width:'15px',
        height: '25px',
    },

    morePopper:{
        zIndex: 1,
    },

    close: {
        padding: theme.spacing(0.5),
    },

    popover: {
        '& .MuiPaper-elevation8':{
            boxShadow: 'none',
        }
    },

    paper: {
        padding: theme.spacing(1),
    },

    colorPalettePaper1: {
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        boxShadow: 'none',
        padding: theme.spacing(0),
    },

    colorPalettePaper2: {
        display: 'flex',
        flexDirection: 'row',
        border: 'none',
        boxShadow: 'none',
        width: 120,
        justifyContent: 'space-around',
        padding: theme.spacing(0.5,0.5),
    },

    addLabelPaper: {
        width: 200,
        padding: '5px 10px'
    },

    reminderPaper: {
        '& .MuiPopover-paper': {
            boxShadow: '0em 0.1em 0.1em 0em lightgray',
            border: '1px solid lightgray',
            borderRadius: '6px',
        }
    },

    reminderList: {
        width: 290,
        maxWidth: 290,
    },

    dateField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },

    timeField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
        borderBottom: '1px solid gray'
    },

    timeList: {
        width: 250,
        maxWidth: 250,
    },

}));