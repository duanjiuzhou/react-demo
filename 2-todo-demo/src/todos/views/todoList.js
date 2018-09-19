import React from 'react';
import PropTypes from 'prop-types'
import TodoItem from './todoItem';
import {connect} from 'react-redux';
import {selectVisibleTodos} from '../selector';
const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
    return (
        <ul className='todo-list'>
        {
            todos.map((item) => (
                <TodoItem
                key={item.id}
                text={item.text}
                completed={item.completed}
                id={item.id}
                ></TodoItem>
            ))
        }
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};


const mapStateToProps = (state) => {
    return {
        todos: selectVisibleTodos(state)
    };
}


export default connect(mapStateToProps)(TodoList);
