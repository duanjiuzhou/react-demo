import React,{Component} from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleTodo, removeTodo} from '../action';


class TodoItem extends Component {
    constructor(){
        super(...arguments);

        console.log('enter TodoItem constructor: ' + this.props.text);
    }

    render() {
        const {onToggle, onRemove, completed, text} = this.props;

        console.log('enter TodoItem render: ' + text);

        return (
            <li 
            className='todo-item'
            style={{textDecoration: completed ? 'line-through' : 'none'}}>
                <input type="checkbox" className='toggle' checked={completed} readOnly onClick={onToggle} />
                <label className='text'>{text}</label>
                <button className='remove' onClick={onRemove}>X</button>
            </li>
        )
    }
}

TodoItem.propTypes = {
    onToggle: PropsTypes.func.isRequired,
    onRemove: PropsTypes.func.isRequired,
    completed: PropsTypes.bool.isRequired,
    text: PropsTypes.string.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {id} = ownProps;
    return {
      onToggle: () => dispatch(toggleTodo(id)),
      onRemove: () => dispatch(removeTodo(id))
    }
  };

export default connect(null, mapDispatchToProps)(TodoItem);