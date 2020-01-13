import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CrossIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        borderRadius: '8px',
        marginLeft: theme.spacing(28),
        boxShadow: ' 0 1px 1px 0 rgba(65,69,73,0.3), 0 1px 3px 1px rgba(65,69,73,0.15) ',
        [theme.breakpoints.down('md')]: {
            width: '45%',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
      <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search notes' }}
      />
      <IconButton  className={classes.iconButton} aria-label="directions">
        <CrossIcon />
      </IconButton>
    </Paper>
  );
}
