import {createStore} from 'redux';
import reducer from './Reducer.js'

const initValues = {
    'First': 0,
    'Second': 10,
    'Third': 20
};

/*
createStore :
含义： 创建Store对象函数
参数：
第一个参数：更新状态的reducer
第二个参数：是状态的初始值
第三个参数：代表Stroe Enhancer
*/

const store = createStore(reducer,initValues);

export default store;