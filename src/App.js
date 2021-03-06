import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,grey50,deepOrangeA400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TabView from './components/tabView.js';
import StepperProgress from './components/stepper.js';


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
    primary1Color: deepOrangeA400
  },
  appBar: {
    height: 50,
    color: grey50,
    textColor: deepOrangeA400,
  },
  stepper: {
        iconColor: deepOrangeA400
    },
  radioButton: {
    color: deepOrangeA400 
  }
 
});

class App extends Component {
  render() {
    return (
       <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <TabView/>  
        <StepperProgress iconColor={deepOrangeA400}/>

      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
