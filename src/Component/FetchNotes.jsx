import React, { lazy } from "react";
import '../CSS/Dashboard.css';
import { getNotes } from '../Firebase/FirebaseServices';
//import NoteCard from './NoteCard';
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import Masonry from 'react-masonry-component';
const NoteCard = lazy(() => import("./NoteCard"));

class FetchNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinNotes: null,
            unpinNotes: null,
        };
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

    componentDidMount() {

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

    render() {
        return (
            <>

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

            </>
        );
    }

}

const mapToStateProps = state => {
    return {
        toggleView: state.view.toggleView
    }
}

export default connect(mapToStateProps)(FetchNotes)