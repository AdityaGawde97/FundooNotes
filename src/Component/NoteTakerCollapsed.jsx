import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { CheckBoxOutlined, BrushOutlined, ImageOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({

  root: {
    padding: '0px 10px',
    display: 'flex',
    width: 570,
    maxWidth: 570,
    borderRadius: '8px',
    boxShadow:'0.1em 0.1em 0.4em 0em #a1a1a1',
    [theme.breakpoints.down('xs')]: {
        width: '100%',
        maxWidth: '100%'
    },
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontWeight: 'bold',
  },

  iconButton: {
    padding: 10,
    marginLeft: theme.spacing(1),
  },

  iconButton2: {
    width:'32px',
    height: '32px',
    margin: 8,
    paddingTop: 5,
    marginLeft: theme.spacing(1),
  },

  closeButton: {
    width:'32px',
    height: '32px',
    margin: 8,
    paddingTop: 5,
    marginLeft: theme.spacing(14),
    textTransform: 'capitalize',
  },

  noteTaker:{
    display: 'flex',
    flexDirection: "row",
    width: 570,
    maxWidth: 570,
    border: '1ps solid white',
    boxShadow:'0.1em 0.1em 0.4em 0em #fff',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '100%'
  },
  }

}));

export default function NoteTakerCollapsed(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}  >
      <InputBase
        className={classes.input}
        placeholder="Take a note..."
        inputProps={{ 'aria-label': 'take a note here' }}
        onClick={props.handleNoteTakerClick}
      />
      <IconButton className={classes.iconButton} aria-label="directions">
        <CheckBoxOutlined />
      </IconButton>
      <IconButton className={classes.iconButton} aria-label="directions" >
        <BrushOutlined />
      </IconButton>
      <IconButton className={classes.iconButton} aria-label="directions">
        <ImageOutlined />
      </IconButton>
    </Paper>
  );
}
