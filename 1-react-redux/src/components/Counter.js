import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
* propTypes检查
*/
const propTypes = {
    initValue:PropTypes.number,
    caption:PropTypes.string.isRequired,
    buttonStyle:PropTypes.object,
    onUpdate:PropTypes.func
};
/**
 * 设置默认prop值
 */
 const defaultProps = {
    initValue: 0,
    onUpdate: f =>f // 默认是一个什么都不做的函数
 };
    
class Counter extends Component {
    constructor (props){
        super(props);
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickEdcrementButton = this.onClickEdcrementButton.bind(this);
        this.state = {
            count: props.initValue
        };
    }

    /**
     * 点击 加
     */
    onClickIncrementButton(){
        this.updateCount(true);
    };

    /**
     * 点击 减
     */
    onClickEdcrementButton(){
        this.updateCount(false);
    }

    /**
     * 是否进行加减，更新数据
     * @param {boolean} isIncrement 
     */
    updateCount(isIncrement){
        const previousValue = this.state.count;
        const newValue = isIncrement ? previousValue + 1 : previousValue - 1;
        this.setState({count: newValue});
        // 子传父 数据 运用函数传递数据
        this.props.onUpdate(newValue,previousValue);
    }

    render() {
        const {caption,buttonStyle} = this.props;
        return (
            <div>
                <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
                <button style={buttonStyle} onClick={this.onClickEdcrementButton}>-</button>
                <span>{caption} count: {this.state.count}</span>
            </div>
        );
    }
}

Counter.defaultProps = defaultProps;
Counter.propTypes = propTypes;

export default Counter;