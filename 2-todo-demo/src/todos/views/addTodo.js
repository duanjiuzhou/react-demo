import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTodo} from '../action';

class AddTodo extends Component {
    // constructor() {
    //     super(...arguments);
    // }

    constructor(props,connect){
        super(props,connect);
        this.onSubmit = this.onSubmit.bind(this);
        this.refInput = this.refInput.bind(this);
    }

    onSubmit(ev){
        ev.preventDefault();

        const input = this.input;
        // 判断输入值为空
        if(!input.value.trim()){
            return;
        }
        this.props.onAdd(input.value);
        input.value = '';
    }

    refInput(node){
        this.input = node;
    }

    render() {
        return (
            <div className='add-todo'>
                <form onSubmit={this.onSubmit}>
                <input className='new-todo' ref={this.refInput} type="text"/>
                <button className='add-btn' type='submit'>添加</button>
                </form>
            </div> 
        )
    }
}

AddTodo.propTypes = {
    onAdd : PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (text) => {
            dispatch(addTodo(text));
        }
    }
};

export  default connect(null, mapDispatchToProps)(AddTodo);