import React from 'react';
import { useStyles } from '../CSS/NoteCardCss'
import { Paper, Typography } from '@material-ui/core';
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton';
import { deleteNotesdata, trashAndRestore } from '../Firebase/FirebaseServices';
import SnackBar from "./SnackBar";
import EditNotetrash from './EditNoteTrash'
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';

export default function NoteTakerExpanded(props) {
    const classes = useStyles();

    const [visible, setVisibility] = React.useState(false)
    const [snack, setSnack] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const toggleView = props.ToggleView
    const [editNote, setEditNote] = React.useState(false);

    return (
        <>
            <Paper
                component="div"
                className={clsx(classes.root, {
                    [classes.rootList]: toggleView,
                })}
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={{ boxShadow: visible && '0em 0em 0.4em 0em gray' }}
            >
                <Paper
                    className={clsx(classes.noteTaker, {
                        [classes.paperGrid]: toggleView,
                    })}
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
                </Paper>
                <Paper
                    className={clsx(classes.noteTaker, {
                        [classes.paperList]: props.ToggleView,
                    })}
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
                    className={clsx(classes.noteTaker, {
                        [classes.paperGrid]: props.ToggleView,
                    })}
                    style={{ visibility: visible ? 'visible' : 'hidden', justifyContent: 'flex-start' }}
                >
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            setMsg('Note delete forever')
                            deleteNotesdata(props.Notekey)
                        }
                        }
                    >
                        <DeleteForeverOutlined fontSize="small" />
                    </IconButton>
                    <IconButton className={classes.iconButton}
                        onClick={() => {
                            setSnack(true)
                            setMsg('Note restored')
                            trashAndRestore(props.Notekey, false)
                        }}
                    >
                        <RestoreFromTrashOutlined fontSize="small" />
                    </IconButton>
                </Paper>
            </Paper>

            <EditNotetrash
                handleClose={() => setEditNote(false)}
                open={editNote}
                NotesObj={props.NoteObj}
                Key={props.Notekey}
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
