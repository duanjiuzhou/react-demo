import React, {Component} from 'react';
import Counter from './Counter';

export default class ContorlPanel extends Component {
    constructor(props){
        super(props);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);
        this.initValues = [0,20,50];
        const initSum = this.initValues.reduce((a,b) => a+b, 0);
        this.state = {
            sum: initSum
        }
    }
    
    /**
     * 求和
     * @param {number} newValue 
     * @param {number} previousValue 
     */
    onCounterUpdate(newValue,previousValue){
        const valueChange = newValue - previousValue;
        this.setState({sum: this.state.sum + valueChange});
    }

    render(){
        return (
            <div>
          <Counter onUpdate={this.onCounterUpdate} caption='Frist' initValue={this.initValues[0]} buttonStyle={{margin:'0 10px'}} />
          <Counter onUpdate={this.onCounterUpdate} caption='Second' initValue={this.initValues[1]} buttonStyle={{margin:'0 10px'}} />
          <Counter onUpdate={this.onCounterUpdate} caption='Third' initValue={this.initValues[2]} buttonStyle={{margin:'0 10px'}} />
          <div>Total Count: {this.state.sum}</div>
            </div>
        )
    }
}