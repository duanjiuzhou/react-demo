import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
     * propTypes检查
     */
    static propTypes = {
        initValue:PropTypes.number,
        caption:PropTypes.string.isRequired,
        buttonStyle:PropTypes.object
    };
    
    /**
     * 点击 加
     */
    onClickIncrementButton(){
        this.setState({count: this.state.count + 1});
    };

    /**
     * 点击 减
     */
    onClickEdcrementButton(){
        this.setState({count: this.state.count - 1});
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
/**
 * 设置默认prop值
 */
Counter.defaultProps = {
    initValue: 0
}

export default Counter;