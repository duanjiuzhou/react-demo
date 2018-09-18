import {SET_FILTER} from './actionTypes.js';

// 设置过滤类型
export const setFilter = filterType => ({
    type: SET_FILTER,
    filter: filterType
});