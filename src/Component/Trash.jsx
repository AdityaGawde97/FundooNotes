import React, { Component } from 'react';
import '../CSS/Dashboard.css';
import Masonry from 'react-masonry-component';
import NoteCardInTrash from './NoteCardInTrash';
import { connect } from 'react-redux';
import { getTrashNotes } from '../Firebase/FirebaseServices';
import { Container } from "@material-ui/core";

class Trash extends Component {
    constructor(props){
        super(props);
        this.state={
            sliderClassName: !this.props.drawerOpen ? 'MainContainer' : 'slideMainContainer' ,
            notes: null,
        };
    }

    static getDerivedStateFromProps(props, state){
        
        if(!window.matchMedia("(max-width: 1000px)").matches){
            return {
                ...state,
                sliderClassName : !props.drawerOpen ? 'MainContainer' : 'slideMainContainer'
            }
        }   
    }
    
    componentDidMount() {
        getTrashNotes( (snapshotValue) => {
                 this.setState({
                    notes: snapshotValue
                })
        })
    }

    render() {
        return (
            <Container style={{marginTop: '6em'}}>

                <div className={this.state.sliderClassName}>

                    <Masonry className={ !this.props.toggleView ? "gridView" : "listView" }>
                        {
                            this.state.notes !== null
                            ?   Object.getOwnPropertyNames(this.state.notes).map((key, index) => (
                                    <NoteCardInTrash 
                                        Notekey = {key}
                                        NoteObj = {this.state.notes[key]}
                                        ToggleView = {this.props.toggleView}
                                        key={key}
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
        toggleView: state.view.toggleView
    }
}

export default connect(mapToStateProps)(Trash);