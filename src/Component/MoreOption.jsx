import React from 'react';
import { useStyles } from '../CSS/NoteCardCss'
import { Paper, Popper, Typography, FormControl, FormGroup, FormControlLabel, Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { trashAndRestore } from '../Firebase/FirebaseServices';
import { addLabelsInNote, removeLabelsInNote } from '../Firebase/FirebaseServices';
import { Checkbox } from '@material-ui/core';
import UserContext from '../UserContext';

export default function MoreOption(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [addLabel, setAddlabel] = React.useState(false);
    
    const labels = props.labels
    const noteKey = React.useContext(UserContext)

    const handleToggle = () => {
        if (addLabel === false) {
            props.setMore(!props.more)
            setOpen(prevOpen => !prevOpen);
        }
    };

    const handleMoreClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        props.setMore(!props.more)
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const openAddLabel = () => {
        props.setMore(true)
        setAddlabel(prevOpen => !prevOpen);
    };

    const closeAddLabel = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        props.setMore(false)
        setAddlabel(false);
    };

    const renderMorePopper = (
        <Popper
            className={(classes.morePopper)}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleMoreClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem
                                    onClick={() => {
                                        props.setSnack(true)
                                        props.setMsg('Note Trashed')
                                        trashAndRestore(noteKey, true)
                                    }}
                                    dense
                                >
                                    Delete note
                        </MenuItem>
                                <MenuItem
                                    dense
                                    onClick={openAddLabel}
                                >
                                    {
                                        props.NoteObj.NoteLabels !== undefined && props.NoteObj.NoteLabels !== null
                                            ? 'Change label' : 'Add label'
                                    }

                                </MenuItem>
                                <MenuItem onClick={handleMoreClose} dense>Add drawing</MenuItem>
                                <MenuItem onClick={handleMoreClose} dense>Make a copy</MenuItem>
                                <MenuItem onClick={handleMoreClose} dense>Show checkboxes</MenuItem>
                                <MenuItem onClick={handleMoreClose} dense>Copy to google docs</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );

    const renderAddLabel = (
        <Popover
            className={(classes.morePopper)}
            open={addLabel}
            anchorEl={anchorRef.current}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={closeAddLabel}
        >
            <Paper className={classes.addLabelPaper}>
                <Typography>Label Note</Typography>
                {
                    labels !== null &&
                    <FormControl component="fieldset">
                        <FormGroup>
                            {
                                Object.getOwnPropertyNames(labels).map((key) => (
                                    <LabelCheckBoxes
                                        labelData={labels[key]}
                                        labelId={key}
                                        NoteObj={props.NoteObj}
                                    />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                }
            </Paper>
        </Popover>

    );

    return (
        <>
            <IconButton className={classes.iconButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <MoreVertIcon fontSize="small" />
                {renderMorePopper}
            </IconButton>
            {renderAddLabel}
        </>
    );
}

export function removeLabelUncheck(labeledNotes,noteKey,labelId, callback){
    let labeledNoteKey;
    if (labeledNotes !== null && labeledNotes !== undefined) {
        Object.getOwnPropertyNames(labeledNotes).map((key) => (
            labeledNotes[key].NoteId === noteKey ? labeledNoteKey = key : null
        ))
    }
    removeLabelsInNote(noteKey, labelId, labeledNoteKey);
    if(callback !== null && callback !== undefined) callback()
}

function LabelCheckBoxes(props) {

    const [check, setCheck] = React.useState(false)

    const noteKey = React.useContext(UserContext)
    const labelName = props.labelData.Label

    React.useEffect(() => {
        if (props.NoteObj.NoteLabels !== null && props.NoteObj.NoteLabels !== undefined) {
            Object.getOwnPropertyNames(props.NoteObj.NoteLabels).map((key) => (
                key === props.labelId &&
                setCheck(true)
            ))
        }
        else {
            setCheck(false)
        }
    }, [props.NoteObj.NoteLabels, props.labelId])

    const addLabelCheck = () => {
        addLabelsInNote(noteKey, props.labelId, labelName);
    }

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        value={labelName}
                        onChange={() => {
                            !check ?
                            addLabelCheck() : 
                            removeLabelUncheck(props.labelData.LabeledNotes, noteKey, props.labelId, 
                                ()=>{
                                    setCheck(false)
                                }
                            )
                        }}
                        size="small"
                        color="default"
                    />
                }
                label={labelName}
            />
        </>
    );
}