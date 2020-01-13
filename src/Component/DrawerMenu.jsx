import React from 'react';
import { IconButton } from '@material-ui/core/';
import { Menu } from '@material-ui/icons';
import { Drawer } from '@material-ui/core/';
import { List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import { EmojiObjectsOutlined, NotificationsOutlined } from "@material-ui/icons";
import { CreateOutlined, ArchiveOutlined, DeleteOutlined } from '@material-ui/icons';
import { useStyles, GrayTooltip } from "../CSS/NavBarCss";
import { toggleDrawerOpen, toggleDrawerClose } from "../Redux/ToggleDrawer/DrawerAction";
import { setLabelPage } from '../Redux/LabelPages/LabelsAction'
import EditLabels from "./EditLabels";
import {getLabels} from '../Firebase/FirebaseServices';
import LabelIcon from '@material-ui/icons/LabelOutlined';
import ChartIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import { useSelector, useDispatch } from 'react-redux'

function DrawerMenu(props) {
    const classes = useStyles();
    const [iconsState] = React.useState({
        icons: {
            notes: <EmojiObjectsOutlined />,
            remainder: <NotificationsOutlined />,
            editlabels: <CreateOutlined />,
            archive: <ArchiveOutlined />,
            trash: <DeleteOutlined />
        }
    });
    const [dialogState, setDialogState] = React.useState(false);
    const [labels, setLabels] = React.useState(null);

    const drawerOpen = useSelector(state => state.drawer.drawerOpen)
    const dispatch = useDispatch()

    const sideList = (
        <div
            className={classes.drawerList}
            role="presentation"
            onClick={() => {
                if (window.matchMedia("(max-width: 400px)").matches) {
                    dispatch(toggleDrawerClose())
                }
            }
            }
        >
            <List className={classes.listStyle} >
                {['Notes', 'Reminders'].map((text, index) => (
                    <ListItem button key={text}
                        className={classes.listItemStyle}
                        onClick={() => {
                            index % 2 === 0
                                ? props.DashboardProps.history.push('/dashboard/notes')
                                : props.DashboardProps.history.push('/dashboard/reminder')

                                props.changeTitle(text)
                        }
                        }
                        style={text === props.State ? { backgroundColor: '#feefc3' } : {}}
                    >
                        <ListItemIcon style={{ color: '#757575' }} >
                            {index % 2 === 0 ? iconsState.icons["notes"] : iconsState.icons["remainder"]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List className={classes.listStyle2}>
                <ListItem>
                    <ListItemText secondary={'LABELS'} />
                </ListItem>
                {                
                    labels !== null &&
                    Object.getOwnPropertyNames(labels).map((key, index) => (
                        <ListItem
                            button 
                            className={classes.listItemStyle}
                            onClick={ () => {
                                props.changeTitle(labels[key].Label)
                                dispatch(setLabelPage(key))
                                props.DashboardProps.history.push('/dashboard/label')
                            }}
                            style={labels[key].Label === props.State ? { backgroundColor: '#feefc3' } : {}}
                        >
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary={labels[key].Label} />
                        </ListItem>
                    ))
                }
                <ListItem button
                    className={classes.listItemStyle}
                    onClick={ () => setDialogState(true)}
                >
                    <ListItemIcon style={{ color: '#757575' }} >
                        {iconsState.icons["editlabels"]}
                    </ListItemIcon>
                    <ListItemText primary={'Edit labels'} />
                </ListItem>
            </List>

            <Divider />

            <List className={classes.listStyle}>
                <ListItem button 
                    onClick={()=>{
                        props.changeTitle('Count Chart')
                        props.DashboardProps.history.push('/dashboard/count-chart')
                    }}
                    className={classes.listItemStyle}
                >
                    <ListItemIcon style={{ color: '#757575' }}>
                        <ChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Count Chart'} />
                </ListItem>
            </List>

            <Divider />

            <List className={classes.listStyle}>
                {['Archive', 'Trash'].map((text, index) => (
                    <ListItem button key={text}
                        className={classes.listItemStyle}
                        onClick={() => {
                            index % 2 === 0
                                ? props.DashboardProps.history.push('/dashboard/archive')
                                : props.DashboardProps.history.push('/dashboard/trash')

                            props.changeTitle(text)
                        }
                        }
                        style={text === props.State ? { backgroundColor: '#feefc3' } : {}}
                    >
                        <ListItemIcon style={{ color: '#757575' }} >
                            {index % 2 === 0 ? iconsState.icons["archive"] : iconsState.icons["trash"]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    React.useEffect(() => {
        getLabels( (snapshot) => {
                setLabels(snapshot)
        } )
    },[]);

    return (
        <>
            <GrayTooltip title="Main Menu">
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => !drawerOpen ? dispatch(toggleDrawerOpen()) : dispatch(toggleDrawerClose())}
                >
                    <Menu />
                </IconButton>
            </GrayTooltip>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                open={drawerOpen}
                anchor='left'
            >
                {sideList}
            </Drawer>

            <EditLabels 
                DialogState = {dialogState}
                CloseDialog = { () => setDialogState(false) }
                Labels = {labels}
            />
        </>
    );
}

export default DrawerMenu