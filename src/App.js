import React from 'react';
import './App.css';
import Routing from './Route/Route';
import { Provider } from "react-redux";
import store from "./Redux/Store";

export default function App(){

    return(
      <Provider store={store} >
        <div>
          <Routing />
        </div>
      </Provider>
    );

}
  
