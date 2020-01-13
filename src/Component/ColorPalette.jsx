import React from 'react';
import { useStyles } from '../CSS/NoteCardCss'
import { Paper, Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/PaletteOutlined';
import { updateBgColor } from '../Firebase/FirebaseServices';

export default function ColorPalette(props) {
    const classes = useStyles();

    const [palette, setPalette] = React.useState(null);
    
    const openColorPalette = event => {
        setPalette(event.currentTarget);
    };

    const closeColorPalette = () => {
        setPalette(null);
    };

    const colorBox = Boolean(palette);

    const renderPalette = (
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={colorBox}
            anchorEl={palette}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={closeColorPalette}
        >
            <Paper className={classes.colorPalettePaper1}>
                <Paper className={classes.colorPalettePaper2}>
                    <IconButton style={{ backgroundColor: '#ffffff', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#ffffff')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#f28b82', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#f28b82')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#fbbc04', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#fbbc04')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#fff475', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#fff475')}
                    ></IconButton>
                </Paper>
                <Paper className={classes.colorPalettePaper2}>
                    <IconButton style={{ backgroundColor: '#ccff90', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#ccff90')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#a7ffeb', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#a7ffeb')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#cbf0f8', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#cbf0f8')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#aecbfa', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#aecbfa')}
                    ></IconButton>
                </Paper>
                <Paper className={classes.colorPalettePaper2}>
                    <IconButton style={{ backgroundColor: '#d7aefb', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#d7aefb')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#fdcfe8', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#fdcfe8')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#e6c9a8', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#e6c9a8')}
                    ></IconButton>
                    <IconButton style={{ backgroundColor: '#e8eaed', border: '1px solid lightgray' }}
                        onClick={() => updateBgColor(props.Notekey, '#e8eaed')}
                    ></IconButton>
                </Paper>
            </Paper>
        </Popover>
    );

    return (
        <>
            <IconButton className={classes.iconButton}
                aria-owns={colorBox ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseLeave={closeColorPalette}
                onClick={!colorBox ? openColorPalette : closeColorPalette}
            >
                <PaletteIcon fontSize="small" />
                {renderPalette}
            </IconButton>      
        </>
    );
}
