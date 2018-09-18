import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO}from './actionTypes.js';

export default (state = [], action) => {
    switch(action.type) {
        // 添加todo
        case ADD_TODO: {
            return [
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                },
                ...state
            ]
        }
        // 已完成或者待办todo
        case TOGGLE_TODO: {
            return state.map((todoItem) =>{
                if(todoItem.id === action.id){
                    return {...todoItem, completed: !todoItem.completed};
                }else {
                    return todoItem;
                }
            })
        }
        // 删除todo
        case REMOVE_TODO: {
            return state.filter((todoItem)=> {
                return todoItem.id !== action.id;
            })
        }
        default: {
            return state;
        }
    }
}