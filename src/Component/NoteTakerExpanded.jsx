import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Button   } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteIcon from '@material-ui/icons/PaletteOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import UndoIcon from '@material-ui/icons/UndoOutlined';
import RedoIcon from '@material-ui/icons/RedoOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import UnPinIcon from "../images/pin.png"; 
import PinIcon from "../images/pinned.png"; 

const useStyles = makeStyles(theme => ({

    root: {
        padding: '1px 10px',
        display: 'flex',
        flexDirection: "column",
        width: 570,
        border: '2px solid white',
        borderRadius: '8px',
        boxShadow:'0.1em 0.1em 0.5em 0.1em #636363',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%'
        },
    },

    inputTitle: {
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        flex: 1,
        fontWeight: 'bold',
    },

    inputNote: {
        marginLeft: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        flex: 1,
    },

    iconButton: {
        width:'32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(1),
        color: '#545454',
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
            margin: theme.spacing(0, 0.6),
        },
    },
  
    closeButton: {
        width:'32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(13),
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(30),
        },
    },
  
    noteTaker:{
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        width: 570,
        border: '1ps solid white',
        boxShadow:'0.1em 0.1em 0.4em 0em #fff',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: '100%'
        },
    },

    pinButton: {
        width:'32px',
        height: '32px',
        marginTop: 8,
    },

    pinIcon: {
        width:'20px',
        height: '25px',
        marginTop: -8,
        paddingTop: 1,
    },

}));

export default function NoteTakerExpanded(props) {
    const classes = useStyles();

    return (
        <Paper component="div" className={classes.root}>
            <Paper className={classes.noteTaker}>
                <InputBase
                    className={classes.inputTitle}
                    placeholder="Title"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={props.noteTitleValue}
                    name="noteTitle"
                    onChange={props.handleNoteChange}
                    autoComplete={false}
                />
                <IconButton 
                    className={classes.pinButton}
                    onClick={ props.HandlePinStatusChange }
                >
                    <Avatar src={ !props.pinStatus ? UnPinIcon : PinIcon } className={classes.pinIcon}></Avatar>
                </IconButton>
            </Paper>
            <Paper className={classes.noteTaker}>
                <InputBase
                    className={classes.inputNote}
                    placeholder="Take a note..."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={props.noteContentValue}
                    name="noteContent"
                    onChange={props.handleNoteChange}
                    multiline={true}
                    autoFocus
                    autoComplete={false}
                />
            </Paper>
            <Paper className={classes.noteTaker}>
                <IconButton className={classes.iconButton}>
                    <AddAlertIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <PersonAddIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <PaletteIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <ImageIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}
                    onClick = {props.HandleArchiveChange}
                >
                    {!props.Archive ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <RedoIcon fontSize="small" />
                </IconButton>
                <Button className={classes.closeButton}
                    onClick={props.handleClickAway}
                >
                    Close
                </Button>
            </Paper>
        </Paper>
      );
}
