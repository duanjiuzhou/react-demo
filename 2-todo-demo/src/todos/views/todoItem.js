import React from 'react';
import PropsTypes from 'prop-types';

const TodoItem = ({onToggle, onRemove, completed, text}) => {
    const checkedProp = completed ? {checked :true} : {};

    return (
        <li 
        className='todo-item'
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
            <input type="checkbox" className='toggle' {...checkedProp} readOnly onClick={onToggle} />
            <label className='text'>{text}</label>
            <button className='remove' onClick={onRemove}>X</button>
        </li>
    )
}

TodoItem.propTypes = {
    onToggle: PropsTypes.func.isRequired,
    onRemove: PropsTypes.func.isRequired,
    completed: PropsTypes.bool.isRequired,
    text: PropsTypes.string.isRequired
}

export default TodoItem;