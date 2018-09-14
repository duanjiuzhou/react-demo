import * as ActionTypes from './ActionTypes.js';

/**
 * 加
 * @param {object} counterCaption 
 */
export const increment = (counterCaption) => {
    return {
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    }
};

/**
 * 减
 * @param {object} counterCaption 
 */
export const decrement = (counterCaption) => {
    return {
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    }
};