import React from 'react';
import { useStyles } from '../CSS/NoteCardCss';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import { Typography, List, ListItem, ListItemText, InputBase, InputAdornment, Button } from '@material-ui/core';
import { Popover, ListItemSecondaryAction, ListItemIcon, TextField } from '@material-ui/core';
import ClockIcon from '@material-ui/icons/AccessTimeOutlined';
import PlaceIcon from '@material-ui/icons/Place';
import BackIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { setReminderDateTime } from '../Firebase/FirebaseServices'
import moment from 'moment';

function SetReminder(props) {

    const notekey = props.Notekey

    const classes = useStyles();

    const todayDate = moment().format('YYYY-MM-DD')
    //const currentTime = moment().format('h:mm A')
    const tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD')
    const laterTime = moment().add(3, 'hour').format('h:mm A')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [view, setView] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [startDate, setDate] = React.useState(todayDate);
    const [startTime, setTime] = React.useState(laterTime);
    const [timeSelect, setTimeSelect] = React.useState(null);
    const inputRef = React.useRef(null)

    const setReminder = (date, time) => {
        setReminderDateTime(notekey, date, time)
        handleClose()
    }

    const handleClick = () => {
        setAnchorEl(anchorRef.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderFirstScreen = (
        <>
            <Typography
                style={{ padding: 15 }}
            >
                Reminders :
            </Typography>

            <List className={classes.reminderList} dense>

                <ListItem button dense
                    onClick={() => setReminder(todayDate, '8:00 PM')}
                >
                    <ListItemText primary={'Later today'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'8:00 PM'} />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button dense
                    onClick={() => setReminder(tomorrowDate, '8:00 AM')}
                >
                    <ListItemText primary={'Tomorrow'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'8:00 AM'} />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button dense>
                    <ListItemText primary={'Next week'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'Mon 8:00 AM'} />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button dense
                    onClick={() => setView(true)}
                >
                    <ListItemIcon>
                        <ClockIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={'Pick data & time'} />
                </ListItem>

                <ListItem button dense>
                    <ListItemIcon>
                        <PlaceIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={'Pick place'} />
                </ListItem>

            </List>
        </>
    );

    const handleTimeSelectClick = (event) => {
        setTimeSelect(event.currentTarget);
    };

    const handleTimeSelectClose = () => {
        setTimeSelect(null);
    };

    const openTimeSelect = Boolean(timeSelect);
    const id2 = openTimeSelect ? 'simple-popover' : undefined;

    const renderTimingList = (
        <Popover
            id={id2}
            open={openTimeSelect}
            anchorEl={timeSelect}
            onClose={handleTimeSelectClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <List className={classes.timeList} dense>
                <ListItem button dense
                    onClick={() => {
                        setTime('8:00 AM')
                        handleTimeSelectClose()
                    }}
                >
                    <ListItemText primary={'Morning'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'8:00 AM'} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button dense
                    onClick={() => {
                        setTime('1:00 PM')
                        handleTimeSelectClose()
                    }}
                >
                    <ListItemText primary={'Afternoon'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'1:00 PM'} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button dense
                    onClick={() => {
                        setTime('6:00 PM')
                        handleTimeSelectClose()
                    }}
                >
                    <ListItemText primary={'Evening'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'6:00 PM'} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button dense
                    onClick={() => {
                        setTime('8:00 PM')
                        handleTimeSelectClose()
                    }}
                >
                    <ListItemText primary={'Night'} />
                    <ListItemSecondaryAction>
                        <ListItemText primary={'8:00 PM'} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button dense
                    onClick={
                        () => {
                            handleTimeSelectClose()
                        }
                    }
                >
                    <ListItemText primary={'Custom'} />
                </ListItem>
            </List>
        </Popover>
    );


    const renderSecondScreen = (
        <>
            <List dense>
                <ListItem divider dense>
                    <IconButton
                        style={{ width: '28px', height: '28px', padding: 5 }}
                        onClick={() => setView(false)}
                    >
                        <BackIcon fontSize="small" />
                    </IconButton>
                    <ListItemText primary="Pick date & time" />
                </ListItem>
                <ListItem>
                    <TextField
                        id="date"
                        type="date"
                        className={classes.dateField}
                        defaultValue={todayDate}
                        value={startDate}
                        onChange={(e) => {
                            setDate(e.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: todayDate
                        }}
                    />
                </ListItem>
                <ListItem>
                    <InputBase
                        id="standard-select"
                        defaultValue={laterTime}
                        value={startTime}
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                        ref={inputRef}
                        className={classes.timeField}
                        onClick={handleTimeSelectClick}
                        // inputProps={{
                        //     min: todayDate
                        // }}
                        endAdornment={
                            <InputAdornment position="end">
                                <ArrowIcon fontSize="small" />
                            </InputAdornment>
                        }
                    />
                    {renderTimingList}
                </ListItem>
                <ListItem style={{ margin: "30px 0px" }}>
                    <ListItemSecondaryAction>
                        <Button
                            style={{ textTransform: 'capitalize' }}
                            color="inherit"
                            onClick={
                                () => setReminder(startDate, startTime)
                            }
                        >
                            Save
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>

            </List>

        </>
    );

    const renderReminderSetter = (
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
            className={classes.reminderPaper}
        >
            {
                !view ? renderFirstScreen : renderSecondScreen
            }
        </Popover>
    );

    // console.log(moment().weekday(7).format('YYYY-DD-MM'))



    return (
        <>
            <IconButton className={classes.iconButton}
                onClick={handleClick}
                ref={anchorRef}
            >
                <AddAlertIcon fontSize="small" />
            </IconButton>
            {renderReminderSetter}
        </>
    );
}

export default SetReminder;