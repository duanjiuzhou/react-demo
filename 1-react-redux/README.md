## react-demo

该案例是为了了解并熟悉react的基本使用，对组件的用法、生命周期、prop、state、Redux、Router一些基本运用所写的demo。

### 1、React 组件生命周期

> 组件的生命周期可分成三个状态：

* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移出真实 DOM
> 生命周期的方法有：

* componentWillMount 在渲染前调用,在客户端也在服务端。

* componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

* componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

* shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。

* componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

* componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

* componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

### 2、子父组件参数

父子组件互相通过props传递数据。

> 父组件传递数据到子组件

~~~
import React, {Component} from 'react';

export default class Parent extends Component{
    render() {
        return(
            <Child name={'issue'} age='1'/>
        )
    }
}

export default class Child extends Component {
    constructor(props){
        super(props);
        console.log(this.props.name, this.props.age)
        //会获得对应的数据.('issue', '1')
    }
}
~~~

> 子组件传递数据到父组件

~~~
import React, {Component} from 'react';

export default class Parent extends Component{
    render() {
        return(
            <Child name={this.name} />
        )
    }

    name = (value) => {
        console.log("receive name value is", value)
    }
}

export default class Child extends Component {
    render(){
        return(
            <input onChange={this.handleChange} />
        )
    }

    handleChange = (e) => {
        let value = e.target.value
        this.props.name(value)
    }
}
~~~

### 3、 Redux 数据状态管理

#### 3.1、 Redux 的基本原则
* 唯一数据源 
* 保持状态只读
* 数据改变只能通过纯函数完成

> 唯一数据源 
唯一数据源指的是应用的状态数据应该只存储在唯一的一个Store上

> 保持状态只读
就是说不能直接修改状态，要修改Store的状态，必须要通过派发一个action对象完成。
要驱动用户界面渲染，就要改变应用的状态，但是改变应用状态的方法不是去修改状态上的值，而是创建
一个新的状态对象返回给Redux，由Redux完成新的状态的组装。

> 数据改变只能通过纯函数完成
这里所说的纯函数就是Reducer。在Redux中，每个reducer的函数签名为 `reducer(state,action)`。
第一个参数state是当前的状态，第二个参数action是接收到的action对象，而reducer函数要做的就是根据
state和action的值产生一个新的对象返回。注意reducer必须是一个纯函数。返回结果必须完全由参数atate和action决定，而且不产生任何副作用，也不能修改参数state和action对象。
Redux的reducer只负责计算状态，却并不负责存储状态。

#### 3.2 规律

在Redux框架下，一个React组件基本上就是要完成以下两个功能：

* 和Redex Store打交道，读取Store的状态，用于初始化组件的状态，同时还要监听Store的状态改变；当Store状态发生变化时，需要更新组件的 状态，从而驱动组件重新渲染；当需要更新Store状态时，就要派发action对象。

* 根据当前的props和state，渲染出用户界面。

#### 3.3 容器组件和傻瓜组件

如果一个组件要包办以上两种规律，为了让组件只专注做一件事情，我们可以进行拆分，拆分为两个组件，分别承担一个任务，然后把两个组件嵌套起来，完成原本一个组件完成的所有任务。这样的关系里，两个组件是父子组件的关系。承担第一个任务的组件，也就是负责和Redux Store打交道的组件，处于外层，所以叫容器组件（聪明组件）；对于承担第二个任务的组件，也就是专心负责渲染的组件，处于内层，叫做展示组件（傻瓜组件）。

实际上，让傻瓜组件无状态，使我们拆分的主要目的之一，傻瓜组件只需要根据props来渲染结果，不需要state。
状态全部交给容器组件处理，通过props将状态传递给傻瓜组件。



