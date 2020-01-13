import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { deleteNotesdata } from '../Firebase/FirebaseServices';
import { trashAndRestore } from '../Firebase/FirebaseServices';
import { RestoreFromTrashOutlined, DeleteForeverOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({

    paper: {
        display: 'flex',
        flexDirection: "column",
        border: '2px solid white',
        borderRadius: '30px',
        boxShadow: '0.1em 0.1em 0.5em 0.1em #636363',
    },

    inputTitle: {
        marginLeft: theme.spacing(0.5),
        paddingTop: theme.spacing(1),
        flex: 1,
        fontSize: '22px',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    inputNote: {
        marginLeft: theme.spacing(0.5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        fontSize: '20px',
        flex: 1,
    },

    iconButton: {
        width: '32px',
        height: '32px',
        paddingTop: 5,
        marginTop: 8,
        marginRight: theme.spacing(1.5),
        color: '#545454',
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0),
        },
    },

    closeButton: {
        width: '32px',
        height: '32px',
        margin: 8,
        paddingTop: 5,
        marginLeft: theme.spacing(13),
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(30),
        },
    },

    noteTaker: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-around',
        width: 570,
        marginTop: theme.spacing(-1),
        marginLeft: theme.spacing(-1),
        border: '1ps solid white',
        boxShadow: '0.1em 0.1em 0.4em 0em #fff',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    pinButton: {
        width: '32px',
        height: '32px',
        marginTop: 5,

    },

    pinIcon: {
        width: '20px',
        height: '25px',
        marginTop: -4,
    },

}));

export default function EditNote(props) {
    const classes = useStyles();
    const [title] = React.useState(props.NotesObj.Title)
    const [content] = React.useState(props.NotesObj.Content)

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" className={classes.paper}>
                <DialogTitle>
                    <Paper className={classes.noteTaker}>
                        <Typography
                            className={classes.inputTitle}
                        > {title} </Typography>
                    </Paper>

                </DialogTitle>
                <DialogContent>
                    <Paper className={classes.noteTaker}>
                        <Typography
                            className={classes.inputNote}
                        > {content} </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Paper className={classes.noteTaker} style={{ justifyContent: 'flex-start' }}>
                        <IconButton className={classes.iconButton}
                            onClick={() => {
                                props.handleClose()
                                deleteNotesdata(props.Key)
                            }}
                        >
                            <DeleteForeverOutlined fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.iconButton}
                            onClick={() => {
                                props.handleClose()
                                trashAndRestore(props.Key, false)
                            }}
                        >
                            <RestoreFromTrashOutlined fontSize="small" />
                        </IconButton>
                    </Paper>
                </DialogActions>
            </Dialog>
        </div>
    );
}
