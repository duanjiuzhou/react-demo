import React, { Component } from 'react';
import logo from './logo.svg';
import ClickCounter from './components/ClickCounter';
import Counter from './components/Counter';
import './App.css';

class App extends Component {

  /** 
   * 组件装载完成 生命钩子
   */
  componentDidMount(){
    console.log('组件装载完成 生命钩子')
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>引用组件</h2>
        <ClickCounter />
        <div>
          <h2>React组件的数据 -- prop是组件的对外接口，state是组件的内部状态</h2>
          <Counter caption='Frist' initValue={0} buttonStyle={{margin:'0 10px'}} />
          <Counter caption='Second' initValue={50} buttonStyle={{margin:'0 10px'}} />
          <Counter caption='Third' initValue={30} buttonStyle={{margin:'0 10px'}} />

          <p><i>注： 组件不应该改变prop的值，而state存在的目的就是让组件来改变的</i></p>
        </div>
      </div>
    );
  }
}

export default App;
