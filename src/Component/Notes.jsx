import React from "react";
import '../CSS/Dashboard.css';
import { setNotesIntoFirebase, getNotes } from '../Firebase/FirebaseServices';
import NoteTakerCollapsed from './NoteTakerCollapsed';
import NoteTakerExpanded from './NoteTakerExpanded';
import NoteCard from './NoteCard';
import { connect } from 'react-redux';
import { Container, ClickAwayListener, Typography } from "@material-ui/core";
import Masonry from 'react-masonry-component';
import bulbImage from '../images/bulb.png'
import worker from './worker.js';
import WebWorker from './workerSetup';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderClassName: !this.props.drawerOpen ? 'MainContainer' : 'slideMainContainer',
            noteTakerState: false,
            clickAway: false,
            noteTitle: '',
            noteContent: '',
            pinStatus: false,
            archive: false,
            trash: false,
            pinNotes: null,
            unpinNotes: null,
        };
    }

    static getDerivedStateFromProps(props, state) {

        if (!window.matchMedia("(max-width: 1000px)").matches) {
            return {
                ...state,
                sliderClassName: !props.drawerOpen ? 'MainContainer' : 'slideMainContainer'
            }
        }
        else {
            return {
                ...state
            }
        }

    }

    handleClickAway = () => {
        this.setState({ clickAway: false });
        if (this.state.noteTitle !== '' || this.state.noteContent !== '') {
            setNotesIntoFirebase(this.state.noteTitle, this.state.noteContent, this.state.pinStatus, this.state.archive)
            this.setState({
                noteTitle: '',
                noteContent: '',
                pinStatus: false,
                Archive: false,
            })
        }
    };

    handleNoteChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    };

    handleArchiveChange = () => {
        this.setState({
            archive: !this.state.archive
        })
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    reverseObject = (object) => {
        let newObject = {};
        let keys = [];

        for (let key in object) {
            keys.push(key);
        }
        for (let i = keys.length - 1; i >= 0; i--) {
            let value = object[keys[i]];
            newObject[keys[i]] = value;
        }
        return newObject;
    }

    fetchNotes = () => {
        getNotes((snapObj) => {
            let pinNotes = {}
            let unpinNotes = {}
            if (snapObj !== undefined && snapObj !== null) {
                Object.getOwnPropertyNames(snapObj).map((key) => {
                    if (snapObj[key].PinStatus === false && snapObj[key].Archive === false && snapObj[key].Trash === false) {
                        unpinNotes[key] = snapObj[key]
                    }
                    else if (snapObj[key].PinStatus === true && snapObj[key].Archive === false && snapObj[key].Trash === false) {
                        pinNotes[key] = snapObj[key]
                    }
                    return 0
                })

                pinNotes = this.reverseObject(pinNotes)
                unpinNotes = this.reverseObject(unpinNotes)

                this.setState({
                    pinNotes: pinNotes,
                    unpinNotes: unpinNotes
                })
            }
        })
    }

    seperateNotesInWorker = () => {
        if (window.Worker) {
            this.worker = new WebWorker(worker);
            getNotes((snapObj) => {
                this.worker.postMessage(snapObj);
            })
            this.worker.addEventListener('message', e => {
                this.setState({
                    pinNotes: this.reverseObject(e.data[0]),
                    unpinNotes: this.reverseObject(e.data[1])
                })
            })
        }
    }

    componentDidMount() {
        this.seperateNotesInWorker()
    }

    render() {
        return (
            <Container style={{ marginTop: '4em' }}>

                <div className={this.state.sliderClassName}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <div className="noteTaker">
                            {
                                !this.state.clickAway
                                    ? <NoteTakerCollapsed handleNoteTakerClick={() => this.setState({ clickAway: true })} />
                                    : <NoteTakerExpanded
                                        handleClickAway={this.handleClickAway}
                                        noteTitleValue={this.state.noteTitle}
                                        noteContentValue={this.state.noteContent}
                                        handleNoteChange={this.handleNoteChange}
                                        HandlePinStatusChange={() => this.setState({ pinStatus: !this.state.PinStatus })}
                                        pinStatus={this.state.pinStatus}
                                        Archive={this.state.archive}
                                        HandleArchiveChange={this.handleArchiveChange}
                                    />
                            }
                        </div>
                    </ClickAwayListener>

                    {
                        this.state.pinNotes === null && this.state.unpinNotes === null &&
                        <div className="bulbContainer">
                            <img alt="temp background" src={bulbImage} className="bulbImage" />
                            <h2>Notes you add appear here</h2>
                        </div>
                    }

                    {
                        !this.isEmpty(this.state.pinNotes) &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '4em', marginLeft: '10.5em' }}
                        >
                            PINNED:- {Object.keys(this.state.pinNotes).length}
                        </Typography>
                    }
                    <Masonry className={!this.props.toggleView ? "gridView" : "listView"}>
                        {
                            this.state.pinNotes !== null &&
                            Object.getOwnPropertyNames(this.state.pinNotes).map((key, index) => (
                                <NoteCard
                                    key={key}
                                    Notekey={key}
                                    NoteObj={this.state.pinNotes[key]}
                                    ToggleView={this.props.toggleView}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                            ))
                        }
                    </Masonry>
                    {
                        !this.isEmpty(this.state.pinNotes) && !this.isEmpty(this.state.unpinNotes) &&
                        <Typography component="p" color="textPrimary" variant="caption"
                            style={{ marginTop: '3em', marginLeft: '10.5em' }}
                        >
                            OTHERS:- {Object.keys(this.state.unpinNotes).length}
                        </Typography>
                    }

                    <Masonry className={!this.props.toggleView ? "gridView" : "listView"}>
                        {
                            this.state.unpinNotes !== null &&
                            Object.getOwnPropertyNames(this.state.unpinNotes).map((key, index) => (
                                <NoteCard
                                    key={key}
                                    Notekey={key}
                                    NoteObj={this.state.unpinNotes[key]}
                                    ToggleView={this.props.toggleView}
                                    HandleArchiveChange={this.handleArchiveChange}
                                />
                            ))
                        }
                    </Masonry>
                </div>

            </Container>
        );
    }

}

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.dOpen,
        toggleView: state.view.toggleView
    }
}

export default connect(mapToStateProps)(Notes)