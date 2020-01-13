import React from 'react';
import { Snackbar, Button, IconButton, makeStyles } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

function SnackBar(props) {
    const classes = useStyles();    
    return (
        <div>
            <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open = {props.open}
                autoHideDuration={5000}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                onClose={props.handleClose}
                message={<span id="message-id">{props.msg}</span>}
                action={[
                    <Button key="undo" size="small" onClick={props.handleClose} style={{color:'#f0b400'}}>
                        UNDO
                    </Button>,
                    <IconButton 
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.handleClose}
                    >
                        <CloseOutlined />
                    </IconButton>
                ]}
            />
        </div>
    );
}

export default SnackBar;