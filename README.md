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

~~~
    /**
     * 装载完成后 监听Store状态变化，同步数据更新
     *
     * @memberof Counter
     */
    componentDidMount() {
        // subscribe(callback) 开启Store状态监听
        store.subscribe(this.onChange);
    };

    componentWillUnmount() {
         // unsubscribe(callback) 注销Store状态监听
        store.unsubscribe(this.onChange);
    };
~~~
#### 3.2 规律

在Redux框架下，一个React组件基本上就是要完成以下两个功能：

* 和Redex Store打交道，读取Store的状态，用于初始化组件的状态，同时还要监听Store的状态改变；当Store状态发生变化时，需要更新组件的 状态，从而驱动组件重新渲染；当需要更新Store状态时，就要派发action对象。

* 根据当前的props和state，渲染出用户界面。

#### 3.3 容器组件和傻瓜组件

如果一个组件要包办以上两种规律，为了让组件只专注做一件事情，我们可以进行拆分，拆分为两个组件，分别承担一个任务，然后把两个组件嵌套起来，完成原本一个组件完成的所有任务。这样的关系里，两个组件是父子组件的关系。承担第一个任务的组件，也就是负责和Redux Store打交道的组件，处于外层，所以叫容器组件（聪明组件）；对于承担第二个任务的组件，也就是专心负责渲染的组件，处于内层，叫做展示组件（傻瓜组件）。

实际上，让傻瓜组件无状态，使我们拆分的主要目的之一，傻瓜组件只需要根据props来渲染结果，不需要state。
状态全部交给容器组件处理，通过props将状态传递给傻瓜组件。

#### 3.4 React-Redux中的connect函数

> 该函数做的工作为：

* 把Store上的状态转化为内层傻瓜组件的prop；
* 把内层傻瓜组件中的用户动作转化为派送给Store的动作

> 运用案例：

~~~
import {connect} from 'react-redux';

......

function mapStateToProps(state, ownProps) {
  return {
    value: state[ownProps.caption]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
~~~
> 注：

* mapStateToProps函数：

把Store上的状态转化为内层傻瓜组件的prop；
mapStateToProps函数参数为 `state, ownProps`，state是store对象实例，ownProps是直接传递给外层容器组件的props。

* mapDispatchToProps函数：

把内层傻瓜组件中的用户动作转化为派送给Store的动作，就是把内层傻瓜组件暴露出来的函数类型prop关联上dispatch函数的调用。
mapStateToProps函数参数为 `dispatch, ownProps`，dispatch是派发action的函数，ownProps是直接传递给外层容器组件的props。

* Counter：

傻瓜组件实例。


#### 3.5 组件性能优化

> 巧用connect函数

组件渲染时，父组件在重复渲染时，会引发所有的子组件的更新过程，即使传递给子组件的prop没有任何变化。

看起来要做的就是给子组件增加`shouldComponentUpdate`函数，判断所需的props，进行新旧对比。没变化返回false, 变化返回true。

例：
~~~
 shouldComponentUpdate(nextProps, nextState) {
     return (nextProps.comleted !== this.props.comleted) || (nextProps.text !== this.props.text)
 }
~~~

但是这样给每个React组件都定制自己的`shouldComponentUpdate`函数。从写代码的角度来看是一件很麻烦的事，但是使用了`react-redux`库，一切都很简单。

使用`react-redux`，一个典型是React组件代码最后一个语句代码是这样：
~~~
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
~~~

connect的过程中实际产生了一个无名的React组件类，这个类定制了`shouldComponentUpdate`函数的实现。实际逻辑是对比这次传递的内层组件的props和上一次的props。判断props有无变化，决定组件的更新渲染。但只是“浅层比较”，对于prop的类型是复杂对象，只会看着两个prop是不是同一个对象的引用，如果不是，哪怕这两个对象中的内容完全一样，也会被认为是这两个不同的prop。

所以使用`connect函数`后会自动调用`shouldComponentUpdate`函数，进行渲染判断。对于一个无状态的组件也可以使用`connect函数`来了利用`shouldComponentUpdate`函数；

例：
~~~
exprot default connect()(组件名称)
~~~

> key的用法

同类型子组件出现多个实例，合理使用key，保证key值的唯一性。避免直接使用下标当做key。

> 用reselect提高数据获取性能

React和Redux都是通过数据驱动渲染过程，那么除了优化渲染过程，获取数据的过程也是一个需要考虑的优化点。

reselect库的工作原理：只要相关状态没有改变，那么就直接使用上一次的缓存结果。

reselect库被用来创建一个“选择器”，所谓选择器就是接受一个state作为参数的函数，这个选择器函数返回的数据就是我们某个mapStateToProps需要的结果。这个选择器工作分为两个部分：

第一步： 从输入参数state抽取第一层的结果，将这个第一层的结果和之前抽取的第一层结果做比较，如果相同就没有必要进行第二部分的运算，直接把之前第二部分的运算结果返回就可以。注意，这部分做的比较，就是js 的 === 操作符比较，如果第一层结果是对象的话，只有是同一对象才会被认为是相同的。

第二步：根据第一层结果计算出选择器需要返回的最终结果。

选择器就是利用这种缓存数据的方式，避免了没有必要的运算浪费。

使用reselect需要安装对应的npm包：
~~~
npm install --save reselect
~~~

例：
~~~
-- selector.js中
import {createSelector} from 'reselect';
import {FilterTypes} from '../constants.js';

const getFilter = (state) => state.filter;
const getTodos = (state) => state.todos;

export const selectVisibleTodos = createSelector(
    [getFilter, getTodos],
    (filter, todos) => {
      switch (filter) {
        case FilterTypes.ALL:
          return todos;
        case FilterTypes.COMPLETED:
          return todos.filter(item => item.completed);
        case FilterTypes.UNCOMPLETED:
          return todos.filter(item => !item.completed);
        default:
          throw new Error('unsupported filter');
      }
    }
  );

  -- todoList.js 

  import {selectVisibleTodos} from '../selector';
  const mapStateToProps = (state) => {
    return {
        todos: selectVisibleTodos(state)
    };
}
~~~

### 4、 React高级组件

#### 4.1、高阶组件

* 代理方式的高阶组件
* 继承方式的高阶组件

> 代理方式的高阶组件

特点：返回一个新组件类直接继承自React.Component类。新组件扮演的角色是传入组件的一个“代理”，在新建组建的render函数中。把被包裹的组件渲染出来，除了高阶组件自己要做的事情，其余功能全部转手给被包裹的组件。

例：
~~~
import React from 'react';

function removeUserProp(WrappedComponent) {
  return class NewComponent extends WrappedComponent {
    render() {
      const {user, ...otherProps} = this.props;
      this.props = otherProps;
      return super.render();
    }
  };
}

export default removeUserProp;
~~~

代理方式的高阶组件，可以运用在以下的场景中：
* 操纵prop；
* 访问ref；
* 抽取状态；
* 包装组件；

> 继承方式的高阶组件

继承方式的高阶组件采用的是继承关系关联作为参数的组件和返回的组件。

例：

~~~
function removeUserProp(WrappedComponent) {
  return class NewComponent extends WrappedComponent {
    render() {
      const elements = super.render();
      const {user, ...otherProps} = this.props;

      console.log('##', elements);

      return React.cloneElement(elements, otherProps, elements.props.children);
    }
  };
}
~~~

代理方式和继承方式最大的区别是，使用被包裹组件的方式。

继承方式的高阶组件可以应用于下列场景：
* 操纵prop；
* 操纵生命周期函数

需要注意，在代理方式下组件经历了一个完整的生命周期，但在继承方式中，super.render只是一个生命周期中的一个函数而已。在代理方式产生的新组件和参数组件是两个不同的组件，一次渲染，两个组件都要经历各自的生命周期，在继承方式下，二者合二为一，只有一个生命周期。

各个方面来看，代理方式都要优于继承方式。业界有一句老话：“优先考虑组合，然后才考虑继承。”

#### 4.2、以函数为子组件

因为高阶组件有对原组件的props有了固化的要求，参数组件必须和自己有契约的方式，会带来很大的麻烦。“以函数为子组件”的模式就是为了克服高阶组件这种局限而产生的。

在这种模式下，实现代码重用的不是一个函数，而是一个真正的React组件。这样的React组件有个特点，要求必须有子组件的存在。而且这个子组件必须是个函数。在组件实例的生命周期中，`this.props.children`引用的就是子组件。render函数会直接把`this.props.children`当做函数来调用，得到的结果就可以作为render返回结果的一部分。

例：

~~~
import React from 'react';

const loggedinUser = 'mock user';

class AddUserProp extends React.Component {
  render() {
    const user = loggedinUser;
    return this.props.children(user)
  }
}

AddUserProp.propTypes = {
  children: React.PropTypes.func.isRequired
}

export default AddUserProp;

-- 让组件吧user显示出来
<AddUserProp>
    { (user) => <div>{user}</div> }
</AddUserProp>
~~~

### 5、Redux和服务器通信

#### 5.1、开启代理功能访问api

在create-react-app中已经具备了代理功能，在根目录package.json中添加如下一行：
~~~
  "proxy": "http://www.weather.com.cn/",
~~~
这个配置告诉应用，当接收到不是要求本地资源的请求时，这个HTTP请求的协议和域名部分替换为`http://www.weather.com.cn/`转手发出去，并将收到的结果返还给浏览器，这样就实现了代理功能。

#### 5.2、React组件访问服务器的生命周期

访问服务器的API是一个异步操作，但是React组件的渲染又是同步的，当开始渲染过程之后，不可能让组件一遍渲染一边等待服务器的返回结果。

总之，当组件进入装载过程的时候，即使组件立即通过fetch函数发起对服务器的请求，也没办法等待服务器的返回数据来进行渲染。因为React组件的装载过程和更新过程中生命周期函数是同步执行的，没有任何机会等待一个异步操作。

一般，在组件装载过程中，在`componentDidMount`函数中做请求服务器的事情，因为当生命周期函数`componentDidMount`被调用的时候。表明装载过程已经完成，组件需要渲染的内容已经在DOM树上出现，对服务器的请求可能依赖于已经渲染的内容，在`componentDidMount`函数中发送对服务器的请求是一个合适的时机。

#### 5.3、React组件访问服务器的优缺点

让React组件自己负责访问服务器的操作非常直接简单，容易理解。但是，把状态存放在组件中其实并不是一个很好的选择，尤其是当组件变得庞大复杂了之后。

Redux是用来帮助管理应用状态的，应该尽量把状态放在Redux Store的状态中，而不是放在React中。同样，访问服务器的操作应该由Redux来完成。

#### 5.4、Redux访问服务器

> redux-thunk中间件
使用Redux访问服务器，同样要解决的是异步问题。Redux的单向数据流是同步操作，驱动Redux流程的是action对象，每一个action对象被派发的Store上之后，同步地被分配给所有的reducer函数，每一个reducer都是纯函数，纯函数不产生任何副作用，自然是完成数据操作之后立即同步的返回，reducer返回的结果又被同步地拿去更新Store上的状态数据，更新状态数据的操作会立刻被同步给监听Store状态改变的函数，从而引发作为视图的React组件的更新过程。

这个过程从头到尾，一路同步执行，根本没有执行异步操作的机会，使用redux-thunk中间件可以解决该问题。
按照`redux-thunk`的想法，在React的单向数据流中，在action对象被reducer函数处理之前，是插入异步功能的时机。

在创建的Store.js 文件中，引入`redux-thunk`

~~~
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware];

middlewares的数组来存储所有的中间件，现在只要往这个数组中加入一个元素就可以了，之后，如果需要用到更多的中间件，只要导入中间件放在middlewares数组中就可以了。
~~~

redux-thunk中间件的工作原理是当action对象被派发出去，还没有到reducer函数，在中间件一层就被redux-thunk截获。
redux-thunk中间件的工作是检查action对象是不是函数，如果不是函数就放行，完成普通的action对象的生命周期，而如果发现action对象是函数，那就执行这个函数，并把Store的dispatch函数和getState函数作为参数传递到函数中去，处理过程到此为止，不会让这个异步action对象继续往前派发到reducer函数。

异步action最终还是要产生同步action派发才能对Redux系统产生影响。redux-thunk要做的工作不过如此，但因为引入了一次函数执行，而且这个函数还能访问到dispatch和getState，就给异步操作带来了可能。

#### 5.5、异步操作的中止

该异步操作依赖于Redux，例：

~~~
import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';

let nextSeqId = 0;

export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;

    const seqId = ++ nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    dispatchIfValid(fetchWeatherStarted())

    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        dispatchIfValid(fetchWeatherSuccess(responseJson.weatherinfo));
      }).catch((error) => {
        dispatchIfValid(fetchWeatherFailure(error));
      });
    }).catch((error) => {
      dispatchIfValid(fetchWeatherFailure(error));
    })
  };
}
~~~

主要是检查当前环境中的seqId是否等同于全局的nextSeqId。如果相同说明dispatchWeather没有被调用，就继续使用dispatch函数，如果不相同，说明这个期间有新的fetchWeather被调用，也就是有新的访问服务器的请求被发出去了，这时候当前的seqId代表的请求就已经过时了，直接扔弃掉，不需要dispatch任何action。

虽然不能真正的“中止”一个API请求，但是我们可以用这种方法让一个API请求的结果被忽略，达到了中止一个API请求一样的效果。

#### 5.6、Redux异步操作的其他方法

redux-thunk并不是在Redux中处理异步操作的唯一方式，只不过redux-thunk应该是应用最简单，也是最容易被理解的一种方式。

> 其它进行异步操作的库还有：

* redux-saga
* redux-effects
* redux-side-effects
* redux-loop
* redux-observable

> 如何挑选异步操作方式

* 第一，在Redux的单向数据流中，什么时机插入异步操作
* 第二，对应库的大小如何？
* 第三，学习曲线是不是太陡？
* 第四，是否和其它Redux库冲突？