import React from 'react';
import PropTypes from 'prop-types'
import TodoItem from './todoItem';
import {toggleTodo, removeTodo} from '../action';
import {FilterTypes} from '../../constants';
import { connect } from 'react-redux';

const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
    console.log(todos)
    return (
        <ul className='todo-list'>
        {
            todos.map((item) => {
                <TodoItem
                key={item.id}
                text={item.text}
                completed={item.completed}
                onToggle={() => onToggleTodo(item.id)}
                onRemove={() => onRemoveTodo(item.id)}
                ></TodoItem>
            })
        }
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
    
    switch (filter) {
        case FilterTypes.ALL:
            return todos;
        case FilterTypes.COMPLETED:
            return todos.filter(item => item.completed);
        case FilterTypes.UNCOMPLETED:
            return todos.filter(item => !item.completed);
        default:
            throw new Error("unsupported filter");
    }
}

const mapStateToProps = (state) => {
   
    return {
        todos: selectVisibleTodos(state.todos, state.filter)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleTodo: (id) => {
            dispatch(toggleTodo(id));
        },
        onRemoveTodo: (id) => {
            dispatch(removeTodo(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
