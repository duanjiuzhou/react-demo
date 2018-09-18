import React, { Component } from 'react';
import {view as Todos} from './todos/';
import {view as Filter} from './filter/';

class App extends Component {

  render() {
    return (
      <div>
          <Todos></Todos>
          <Filter></Filter>
      </div>
    );
  }
}

export default App;
