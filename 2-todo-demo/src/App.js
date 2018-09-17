import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  /** 
   * 组件装载完成 生命钩子
   */
  componentDidMount(){
    console.log('组件装载完成 生命钩子')
  };

  /**
   * 组件更新前 生命
   * 
   * 组件是否继续渲染更新
   * 
   * 返回true 继续更新过程，接下来调用render函数。
   * 返回false 立即停止更新过程，不会继续渲染。
   * 
   * 运行过程：
   * this.setState 函数引发更新过程，并不是立即更新组件state值，
   * 在执行到函数shouldComponentUpdate的时候，this.state依然是this.setState函数
   * 执行以前的值
   * 
   * 运用： 
   * 能够提高react组件的性能。判断props 和 state 是否变化 返回true或false
   * 
   */
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

  /**
   *  组件已经更新完成 生命钩子函数
   * 
   * 参数为上一次的数据，不是更新过后的数据
   */
  componentDidUpdate(lastProps,lastState){
    console.log('componentDidUpdate',lastProps,lastState)
  }

  /**
   * 组件将卸载 生命钩子
   * 
   * 常常是componentDidMount中用非React方法创造了一些DOM元素，
   * 需要在卸载前把创造的DOM元素清理掉，避免造成内存泄露。
   */
  componentWillUnmount(){
    console.log("卸载前")
  }


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
      </div>
    );
  }
}

export default App;
