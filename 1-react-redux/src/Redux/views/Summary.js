import React,{Component} from 'react';
import store from '../Store';
import PropTypes from 'prop-types';

class Summary extends Component {
    render() {
        return (
          <div>Total Count: {this.props.sum}</div>
        );
      }
}

Summary.propTypes = {
    sum: PropTypes.number.isRequired
  };

class SummaryContainer extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = this.getOwnState();
    }

    /**
     * 获取自己的数据
     */
    getOwnState() {
        const state = store.getState();
        let sum = 0;
        for(const key in state){
            if(state.hasOwnProperty(key)){
                sum += state[key];
            }
        }
        return {sum: sum};
    };

    /**
     * 更新状态
     */
    onChange() {
        this.setState(this.getOwnState);
    };

    shouldComponentUpdate(nextProps,nextState){
        return nextState.sum !== this.state.sum;
    };

    componentDidMount() {
        store.subscribe(this.onChange);
    };

    componentWillUnmount() {
        store.unsubscribe(this.onChange);
    };

    render() {
        console.log(this.props.children)
        return (
            <Summary sum={this.state.sum}></Summary>
          );
    };
}

export default SummaryContainer;