import React, { Component } from 'react';
import '../CSS/Dashboard.css';
import Masonry from 'react-masonry-component';
import NoteCard from './NoteCard';
import { connect } from 'react-redux';
import { getNotes } from '../Firebase/FirebaseServices';
import { Container } from "@material-ui/core";

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderClassName: !this.props.drawerOpen ? 'MainContainer' : 'slideMainContainer',
            labelPage: this.props.currentLabelId,
            notes: null,
        };
    }

    static getDerivedStateFromProps(props, state) {

        if (!window.matchMedia("(max-width: 1000px)").matches) {
            return {
                ...state,
                sliderClassName: !props.drawerOpen ? 'MainContainer' : 'slideMainContainer',
                labelPage: props.currentLabelId
            }
        }
        else {
            return {
                labelPage: props.currentLabelId
            }
        }
    }

    fetchLabelNotes = () => {
        getNotes((snapObj) => {
            let labeledNotes = {}
            if (snapObj !== null && snapObj !== undefined) {
                Object.getOwnPropertyNames(snapObj).map((noteKey) => {
                    const noteLabels = snapObj[noteKey].NoteLabels
                    if (noteLabels !== null && noteLabels !== undefined) {
                        Object.getOwnPropertyNames(noteLabels).map((labelKey) => (
                            labelKey === this.state.labelPage ?
                                labeledNotes[noteKey] = snapObj[noteKey]
                                : null
                        ))
                    }
                    return 0;
                })
            }
            this.setState({
                notes: labeledNotes
            })
        })
    }

    componentDidMount() {
        this.fetchLabelNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.labelPage !== this.state.labelPage) {
            this.fetchLabelNotes()
        }
    }

    render() {
        console.log(this.state);


        return (
            <Container style={{ marginTop: '6em' }}>

                <div className={this.state.sliderClassName}>

                    <Masonry className={!this.props.toggleView ? "gridView" : "listView"}>
                        {
                            this.state.notes !== null
                                ? Object.getOwnPropertyNames(this.state.notes).map((key, index) => (
                                    <NoteCard
                                        Notekey={key}
                                        key={key}
                                        NoteObj={this.state.notes[key]}
                                        ToggleView={this.props.toggleView}
                                        HandleArchiveChange={this.handleArchiveChange}
                                    />
                                ))
                                : null
                        }
                    </Masonry>
                </div>
            </Container>
        );
    }
}

const mapToStateProps = state => {
    return {
        drawerOpen: state.drawer.drawerOpen,
        toggleView: state.view.toggleView,
        currentLabelId: state.label.currentLabelId
    }
}

export default connect(mapToStateProps)(Label);