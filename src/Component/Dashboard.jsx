import React , { Component } from 'react';
import Navbar from './Navbar';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={}; 
    }

    

    render(){
        
        return(
            <div>
                <Navbar DashboardProps={this.props} />
            </div>
        );
    }
}   

