import React from 'react';
import { useStyles } from '../CSS/NoteCardCss'
import { Paper, Typography, Avatar, Chip } from '@material-ui/core';
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import UnPinIcon from "../images/pin.png";
import PinIcon from "../images/pinned.png";
import ClockIcon from '@material-ui/icons/AccessTimeOutlined';
import { updatePinStatus, updateArchiveStatus, getLabels, removeReminder } from '../Firebase/FirebaseServices';
import SnackBar from "./SnackBar";
import EditNote from './EditNote';
import ColorPalette from './ColorPalette';
import MoreOption, { removeLabelUncheck } from './MoreOption';
import { UserProvider } from '../UserContext'
import SetReminder from './SetReminder';
import moment from 'moment';

export default function NoteCard(props) {

    const classes = useStyles();
    const [visible, setVisibility] = React.useState(false)
    const [snack, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const toggleView = props.ToggleView
    const [editNote, setEditNote] = React.useState(false);
    const [more, setMore] = React.useState(false)
    const [labels, setLabels] = React.useState(null);

    // const todayDate = moment().format('YYYY-DD-MM')
    // const tomorrowDate = moment().add('days', 1).format('YYYY-DD-MM')

    React.useEffect(() => {
        getLabels((snapshot) => {
            setLabels(snapshot)
        })
    }, []);

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root, {
                    [classes.rootList]: toggleView,
                })}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={
                    {
                        boxShadow: visible && '0em 0em 0.4em 0em gray',
                        backgroundColor: props.NoteObj.BgColor,
                        border: props.NoteObj.BgColor === '#ffffff' ? '1px solid lightgray' : '1px solid #ffffff',
                    }
                }
            >
                <Paper
                    className={clsx(classes.noteTaker, {
                        [classes.paperGrid]: toggleView,
                    })}
                    style={{ backgroundColor: props.NoteObj.BgColor }}
                >
                    <Typography className={classes.noteTitle}
                        onClick={
                            () => {
                                setEditNote(true)
                            }
                        }
                    >
                        {props.NoteObj.Title}
                    </Typography>
                    <IconButton
                        style={{ visibility: visible || more ? 'visible' : 'hidden' }}
                        onClick={() => {
                            updatePinStatus(props.Notekey, !props.NoteObj.PinStatus)
                        }}
                        className={clsx(classes.pinButton, {
                            [classes.pinButtonList]: toggleView,
                        })}
                    >
                        <Avatar
                            src={!props.NoteObj.PinStatus ? UnPinIcon : PinIcon}
                            className={classes.pinIcon}

                        ></Avatar>
                    </IconButton>
                </Paper>

                <Paper
                    className={clsx(classes.noteTaker, {
                        [classes.paperList]: props.ToggleView,
                    })}
                    style={{ backgroundColor: props.NoteObj.BgColor }}
                    onClick={
                        () => {
                            setEditNote(true)
                        }
                    }
                >
                    <Typography className={classes.noteContent}>
                        {props.NoteObj.Content}
                    </Typography>
                </Paper>

                <Paper
                    style={{ backgroundColor: props.NoteObj.BgColor }}
                    className={clsx(classes.chipPaper, {
                        [classes.paperGrid]: props.ToggleView,
                    })}
                >
                    {
                        props.NoteObj.ReminderDate !== null && props.NoteObj.ReminderDate !== undefined &&
                        <Chip 
                            icon={<ClockIcon />}
                            label={
                                moment(props.NoteObj.ReminderDate).format('MMM D') + ', ' +
                                props.NoteObj.ReminderTime
                            }
                            size="small"
                            style={{
                                margin: '10px 4px 4px 0px'
                            }}
                            onDelete={()=>removeReminder(props.Notekey)}
                        />
                    }
                    {
                        props.NoteObj.NoteLabels !== null && props.NoteObj.NoteLabels !== undefined &&
                        Object.getOwnPropertyNames(props.NoteObj.NoteLabels).map((key) => (
                            <Chip
                                key={key}
                                label={props.NoteObj.NoteLabels[key].LabelName}
                                size="small"
                                style={{
                                    margin: '10px 4px'
                                }}
                                onDelete={() => {
                                    removeLabelUncheck(labels[key].LabeledNotes, props.Notekey, key)
                                }}
                            />
                        ))
                    }
                </Paper>

                <Paper style={{ backgroundColor: props.NoteObj.BgColor, visibility: more || visible ? 'visible' : 'hidden' }}
                    className={clsx(classes.noteTaker, {
                        [classes.paperGrid]: props.ToggleView,
                    })}
                >

                    <SetReminder Notekey={props.Notekey} /> 

                    <IconButton className={classes.iconButton}>
                        <PersonAddIcon fontSize="small" />
                    </IconButton>

                    <ColorPalette
                        Notekey={props.Notekey}
                    />

                    <IconButton className={classes.iconButton}>
                        <ImageIcon fontSize="small" />
                    </IconButton>
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            if (!props.NoteObj.Archive) {
                                setMsg('Note archived')
                            }
                            else {
                                setMsg('Note unarchived')
                            }
                            updateArchiveStatus(props.Notekey, !props.NoteObj.Archive)
                        }}
                    >
                        {!props.NoteObj.Archive ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                    </IconButton>
                    <UserProvider value={props.Notekey}>
                        <MoreOption
                            setSnack={setSnack}
                            setMsg={setMsg}
                            setMore={setMore}
                            NoteObj={props.NoteObj}
                            more={more}
                            labels={labels}
                        />
                    </UserProvider>

                </Paper>
            </Paper>

            <EditNote
                handleClose={() => setEditNote(false)}
                NotesObj={props.NoteObj}
                Key={props.Notekey}
                open={editNote}
            />

            <SnackBar
                open={snack}
                msg={msg}
                handleClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setSnack(false);
                }}
            />
        </>
    );
}
