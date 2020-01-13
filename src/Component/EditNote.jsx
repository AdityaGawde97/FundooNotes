import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Button, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
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
import { trashAndRestore, updateNotesIntoFirebase } from '../Firebase/FirebaseServices';
import UnPinIcon from "../images/pin.png";
import PinIcon from "../images/pinned.png";
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({

    paper: {
        display: 'flex',
        flexDirection: "column",
        border: 'none',
        borderRadius: '30px',
        boxShadow: 'none',
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(229, 229, 229, 0.75)',
        }
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
        border: 'none',
        boxShadow: 'none',
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
    const anchorRef = React.useRef(null);
    const [title, setTitle] = React.useState(props.NotesObj.Title)
    const [content, setContent] = React.useState(props.NotesObj.Content)
    const [pin, setPin] = React.useState(props.NotesObj.PinStatus)
    const [archive, setArchive] = React.useState(props.NotesObj.Archive)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const updateNote = async () => {
        await updateNotesIntoFirebase(props.Key, title, content, pin, archive)
        props.handleClose()
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderMorePopper = (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                        <MenuItem
                            onClick={() => { trashAndRestore(props.key) }}
                            dense
                        >
                            Delete note
                    </MenuItem>
                        <MenuItem onClick={handleClose} dense>Add label</MenuItem>
                        <MenuItem onClick={handleClose} dense>Add drawing</MenuItem>
                        <MenuItem onClick={handleClose} dense>Make a copy</MenuItem>
                        <MenuItem onClick={handleClose} dense>Show checkboxes</MenuItem>
                        <MenuItem onClick={handleClose} dense>Copy to google docs</MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popover>
    );

    return (
        <div>
            <Dialog open={props.open} onClose={updateNote} aria-labelledby="form-dialog-title" className={classes.paper}>
                <DialogTitle style={{ backgroundColor: props.NotesObj.BgColor }}>
                    <Paper className={classes.noteTaker} style={{ backgroundColor: props.NotesObj.BgColor }}>
                        <InputBase
                            className={classes.inputTitle}
                            placeholder="Title"
                            inputProps={{ 'aria-label': 'search' }}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            defaultValue={title}
                        />
                        <IconButton
                            className={classes.pinButton}
                            onClick={() => setPin(!pin)}
                        >
                            <Avatar src={pin ? PinIcon : UnPinIcon} className={classes.pinIcon}></Avatar>
                        </IconButton>
                    </Paper>

                </DialogTitle>
                <DialogContent style={{ backgroundColor: props.NotesObj.BgColor }}>
                    <Paper className={classes.noteTaker} style={{ backgroundColor: props.NotesObj.BgColor }}>
                        <InputBase
                            className={classes.inputNote}
                            placeholder="Take a note..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            multiline={true}
                            autoFocus
                            defaultValue={content}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions style={{ backgroundColor: props.NotesObj.BgColor }}>
                    <Paper className={classes.noteTaker} style={{ backgroundColor: props.NotesObj.BgColor }}>
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
                            onClick={() => setArchive(!archive)}
                        >
                            {!archive ? <ArchiveIcon fontSize="small" /> : <UnarchiveIcon fontSize="small" />}
                        </IconButton>

                        <IconButton className={classes.iconButton}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon fontSize="small" />
                            {renderMorePopper}
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <UndoIcon fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.iconButton}>
                            <RedoIcon fontSize="small" />
                        </IconButton>
                        <Button className={classes.closeButton}
                            onClick={updateNote}
                        >
                            Close
                    </Button>
                    </Paper>
                </DialogActions>
            </Dialog>
        </div>
    );
}
