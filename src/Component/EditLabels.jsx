import React from 'react';
import { Dialog, IconButton, InputBase, Paper, Divider, Button, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/ClearOutlined';
import DoneIcon from '@material-ui/icons/DoneOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import LabelIcon from '@material-ui/icons/Label';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/core/styles";
import { addLabel, updateLabels, deleteLabel } from '../Firebase/FirebaseServices';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        border: 'none',
        boxShadow: 'none',
    },

    paper: {
        border: 'none',
        boxShadow: 'none',
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
    },

    paper2: {
        border: 'none',
        boxShadow: 'none',
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(0),
    },

    button: {
        marginLeft: theme.spacing(25)
    },

    iconButton: {
        height: '25px',
        width: '40px',
        paddingTop: 3
    }
}))

function EditLabels(props) {
    const classes = useStyle();

    const [btnState, setBtnState] = React.useState(false);
    const [inputState, setInputState] = React.useState(null);
    const labels = props.Labels

    return (
        <div>
            <Dialog open={props.DialogState} onClose={props.CloseDialog} >
                <Paper className={classes.root}>
                    <Paper className={classes.paper}>
                        Edit labels
                    </Paper>

                    <Paper className={classes.paper}>
                        <List
                            dense={true}
                            disablePadding={true}
                        >
                            <ListItem dense={true} disableGutters={true}>
                                <ListItemIcon>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => setBtnState(!btnState)}
                                    >
                                        {btnState ? <ClearIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>
                                    <InputBase
                                        placeholder="Create new label"
                                        className={classes.inputBase}
                                        autoFocus={btnState}
                                        style={{ borderBottom: btnState ? '1px solid lightgray' : 'none' }}
                                        value={inputState}
                                        onChange={(e) => setInputState(e.target.value)}
                                        onClick={() => setBtnState(true)}
                                    />
                                </ListItemText>
                                <ListItemIcon>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => {
                                            if (inputState !== null && inputState !== '') {
                                                addLabel(inputState)
                                            }
                                            setInputState('')
                                        }}
                                        style={{ visibility: !btnState ? 'hidden' : 'visible' }}
                                    >
                                        <DoneIcon fontSize="small" />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        </List>

                    </Paper>

                    {
                        labels !== null &&
                        Object.getOwnPropertyNames(labels).map((key, index) => (
                            <LabelList
                                label={labels[key].Label}
                                LabelKey={key}
                            />
                        ))
                    }

                    <Divider />

                    <Paper className={classes.paper}>
                        <Button className={classes.button} onClick={props.CloseDialog}>
                            Done
                        </Button>
                    </Paper>
                </Paper>
            </Dialog>
        </div>
    );
};

function LabelList(props) {

    const classes = useStyle();

    const [btnState, setBtnState] = React.useState(false);
    const [trashBtn, setTrashBtn] = React.useState(false);
    const [inputState, setInputState] = React.useState(null);

    const key = props.LabelKey
    
    return (
        <Paper className={classes.paper2}>
            <List
                dense={true}
                disablePadding={true}
                onMouseEnter={() => setTrashBtn(true)}
                onMouseLeave={() => setTrashBtn(false)}
            >
                <ListItem dense={true} disableGutters={true}>
                    <ListItemIcon dense={true}>
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => {
                                deleteLabel(key)
                            }}
                        >
                            {!trashBtn ? <LabelIcon fontSize="small" /> : <DeleteIcon fontSize="small" />}
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText>
                        <InputBase
                            autoFocus={btnState}
                            placeholder="Enter Label Name"
                            className={classes.inputBase}
                            style={{ borderBottom: btnState ? '1px solid lightgray' : 'none' }}
                            value={inputState}
                            onChange={(e) => setInputState(e.target.value)}
                            defaultValue={props.label}
                            onClick={() => setBtnState(true)}
                        />
                    </ListItemText>
                    <ListItemIcon>
                        <IconButton className={classes.iconButton}
                            onClick={
                                !btnState ? () => setBtnState(!btnState)
                                    : () => {
                                        if (inputState !== null) {
                                            updateLabels(key, inputState)
                                        }
                                        setBtnState(!btnState)
                                    }}
                        >
                            {!btnState ? <CreateIcon fontSize="small" /> : <DoneIcon fontSize="small" />}
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Paper>
    );
}

export default EditLabels;


