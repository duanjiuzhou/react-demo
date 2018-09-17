import React, { Component } from 'react';
import PropTypes from 'prop-types';

import store from '../Store.js';
import * as Actions from '../Action.js';

const buttonStyle = {
    margin: '10px'
  };

class Counter extends Component {
    render(){
        const {caption, onIncrement, onDecrement, value} = this.props;

        return (
            <div>
                <button style={buttonStyle} onClick={onIncrement}>+</button>
                <button style={buttonStyle} onClick={onDecrement}>-</button>
                <span>{caption} count: {value}</span>
            </div>
        );
    };
}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
};


class CounterContainer extends Component {
    constructor(props) {
        super(props);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getOwnState = this.getOwnState.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        // getState()  能够获得store上存储的所有状态
        return {
            value: store.getState()[this.props.caption]
        };
    }

    /**
     * 更新状态
     *
     * @memberof Counter
     */
    onChange() {
        this.setState(this.getOwnState());
    };

    /**
     * 加操作 修改store内状态
     *
     * @memberof Counter
     */
    onIncrement() {
        store.dispatch(Actions.increment(this.props.caption));
    };

    /**
     * 减操作 修改store内状态
     *
     * @memberof Counter
     */
    onDecrement() {
        store.dispatch(Actions.decrement(this.props.caption))
    }


    /**
     * 装载完成后 监听Store状态变化，同步数据更新
     *
     * @memberof Counter
     */
    componentDidMount() {
        // subscribe(callback) 开启Store状态监听
        store.subscribe(this.onChange);
    };

    componentWillUnmount() {
         // unsubscribe(callback) 注销Store状态监听
        store.unsubscribe(this.onChange);
    };

    render(){
        const value = this.state.value;
        const {caption} = this.props;
    
        return (
          <Counter caption={caption}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
          value={value}
          />
        );
    };
};

CounterContainer.propTypes = {
    caption: PropTypes.string.isRequired
  };

export default CounterContainer;