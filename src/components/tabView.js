import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class TabView extends Component {


  render() {
    return (
      <div>
        <AppBar
          title="Vinnumat fjarnáms við Fjölbrautaskólann við Ármúla"
          showMenuIconButton={false}
        />
      </div>
    );
  }
}


export default TabView

