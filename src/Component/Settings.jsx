import React from 'react';
import { SettingsOutlined} from '@material-ui/icons';
import { IconButton, MenuItem } from '@material-ui/core/';
import { useStyles, GrayTooltip } from "../CSS/NavBarCss";
import { Paper, Popper, MenuList, ClickAwayListener, Grow } from '@material-ui/core/';

function Settings(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);


    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
          console.log('tab');
          
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

    const renderMenu = (

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
                <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Enable dark theme</MenuItem>
                        <MenuItem onClick={handleClose}>Send Feedback</MenuItem>
                        <MenuItem onClick={handleClose}>Help</MenuItem>
                        <MenuItem onClick={handleClose}>App downloads</MenuItem>
                        <MenuItem onClick={handleClose}>Keyboard shortcuts</MenuItem>
                    </MenuList>
                </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
    )

    return (

        <GrayTooltip title="Settings">
            <IconButton
                className={classes.settings}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <SettingsOutlined />
                {renderMenu}
            </IconButton>
        </GrayTooltip>
           
    );
}

export default Settings