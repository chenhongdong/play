## 1.Vue 项目时为什么要在v-for中写 key，其作用是什么？
理解：
- 没有key的话就会暴力比对，就地复用原则，标签一样,key一样也会复用
- key主要用在diff算法上，新旧节点比较时识别虚拟dom
- 使用key会基于key的变化重排元素的位置，并且会移除不存在的key元素
- 比如ul里有4个li，内容分别是ABCD，最后要变成DCBA。如果有唯一的key，就会找去看是否有对应的key值，找到后只是交换位置

## 2.Vuex 的设计思想
Vuex的原理：
1. 通过install方法，把Store注册到Vue中，通过Vue.mixin混入到每个组件实例上并在beforeCreate钩子时给实例上添加$store属性
2. new Vue实现双向数据绑定state
3. getters算是计算属性，通过Object.defineProperty来进行数据的劫持
4. mutations和actions一样遍历key然后执行对象里面的函数，发布订阅
5. commit接收type和payload参数，commit实际上是把mutations同步方法的数组执行一遍顺便带上传递的payload参数
6. dispatch也接收type和payload参数，dispatch实际是把actions中的所有异步方法执行一遍

## 3.聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

## 4.为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？
- 因为在mutation触发的时候，异步操作的话，就不知道什么时候会被调用
- 所以任何在回调函数中进行的状态改变都是无法追踪的

## 5.在 Vue 中，子组件为何不可以修改父组件传递的 Prop
- 因为prop是一种单向向下的数据流，父组件的prop更新会向下流动到子组件中，从而得到最新的值
- 如果子组件修改了prop，会造成数据流向的无法定位，而且浏览器会发出警告

## 6.双向绑定和 vuex 是否冲突
- 是的，有冲突，在严格模式下vuex会报错
- 因为input直接修改了state的值，而没有经过mutation操作去修改
- 解决冲突
    
1. 在input上绑定value，并且监听input或change事件，在回调中commit提交mutation
```
<input :value="msg" @input="input">

computed: {
    ...mapState({
        msg: state => state.msg
    })
},
methods: {
    input(e) {
        this.$store.commit('input', e.target.value)
    }
}
``` 
2. 计算属性设置setter
```
<input v-model="msg" >

computed: {
    msg: {
        get() {
            return this.$store.state.msg
        },
        set(newVal) {
            this.$store.commit('input', newVal);
        }
    }
}
```

## 7.Vue 的响应式原理中 Object.defineProperty 有什么缺陷？
- 不能观测数组，数组的索引修改值和数组的长度无法观测到

## 8.Vue 的父组件和子组件生命周期钩子执行顺序是什么
- 同31题
## 9.vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？
- 需要使用事件代理，因为vue的事件绑定是直接给当前元素上的，没有做到绑定父元素上的事件代理，出于性能的考虑

## 10.谈一下你对MVVM原理的理解
理解： 
传统的前端会将数据手动渲染到页面上，MVVM模式不需要用户收到操作dom元素，将数据绑定到viewModel层上，
会自动将数据渲染到页面中，视图变化会通知viewModel层更新数据。viewModel就是我们MVVM模式中的桥梁。

## 11.请说一下响应式数据的原理
理解：
1. 核心点Object.defineProperty
2. 默认Vue在初始化数据时，会给data中的属性使用Object.defineProperty重新定义所有属性，当页面取到对应属性时。会进行依赖收集(收集当前组件的watcher)，如果属性发生变化会通知相关依赖进行更新操作

## 12.Vue中是如何检测数组变化
理解：
- 使用函数劫持的方式，重写了数组的方法
- Vue将data中的数组，进行了原型链重写。指向了自己定义的数组原型方法，这样当调用数组方法时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的对象再次进行监控。

## 13.为何Vue采用异步渲染
理解：
- vue是组件级更新，如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染。所以为了性能考虑，Vue会在本轮数据更新后，再去异步更新视图

## 14.nextTick实现原理
理解：
- nextTick方法主要是使用了宏任务和微任务。定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。所以nextTick方法就是异步方法

## 15.Vue中computed的原理
理解：
- 默认computed也是一个watcher,是具备缓存的，只有当依赖的属性发生变化时才会更新视图

## 16.Wacth中的deep: true是如何实现的
理解：
- 当用户指定了watch中的deep属性为true时，如果当前监控的值是数组类型。会对对象中的每一项进行求值，此时会将当前watcher存入到对应属性的依赖中，这样数组中对象发生变化时也会发生通知数据更新

## 17.vue组件的生命周期

## 18.ajax请求放在哪个生命周期里
理解：
- 在created的时候，dom还没有渲染出来，所以此时如果去操作dom节点，就找不到对应的元素
- 在mounted中，由于此时dom已经渲染出来了，所以可以直接操作dom节点

一般情况下都放到mounted中，保证逻辑的统一性，因为生命周期是同步执行的，ajax是异步执行的
## 19.何时需要使用beforeDestroy
理解：
- 可能在当前页面中使用了$on方法，那需要在组件销毁前解绑
- 清除定时器
- 解除事件的绑定，如scroll,mousemove等等

## 20.Vue中模板编译原理
理解：
- 将template转化成render函数
原理：
- 将模板转化成ast语法树，虚拟dom
- 优化树
- 将ast树生成js代码

## 21.Vue中的v-if和v-show的区别
理解：
- v-if如果条件不成立不会渲染当前指令所在节点的dom
- v-show只是切换当前dom的显示和隐藏(display)  v-show实现是编译的指令

## 22.为什么v-for和v-if不能连用
理解：
- v-for比v-if优先级更高，如果连用的话会把v-if给每个元素都添加一遍，会有性能消耗的问题
- 比如v-for循环了3遍了，然后v-if都是false，那之前已经循环的3遍就浪费了，不如把v-if提出来写在外层处理

## 23.用vnode来描述一个DOM结构
理解：
- 虚拟节点就是用对象来描述真实的dom元素

## 24.diff算法的时间复杂度
- 两个树完全的diff算法是一个时间复杂度为O(n^3)，Vue进行了优化转化成了O(n)复杂度的问题，只比较同级不考虑跨级问题。
- 在前端当中，你很少会跨域层级地移动Dom元素，所以虚拟dom只会对同级元素进行比较

## 25.简述vue中diff算法原理
理解：
- 先同级比较，再比较子节点
- 先判断一方有儿子，一方没儿子的情况
- 比较都有儿子的情况
- 递归比较子节点

## 26.描述组件渲染和更新过程
理解：
- 渲染组件时，会通过Vue.extend方法构建子组件的构造函数，并进行实例化。
- 最终手动调用$mount方法进行挂载
- 更新组件时会进行patchVnode流程，核心就是diff算法

## 27.组件中的data为什么是一个函数
理解：
- 组件可以创建出多个实例，如果data是个纯对象的话，所有实例都共用一个数据对象
- 提供data函数，每次创建实例后，都会调用data函数去返回一个新的对象，数据之间不相互影响

## 28.Vue中事件绑定的原理
理解：
- Vue的事件绑定分为两种
1. 原生的事件绑定
    - 其实就是给元素身上加上了addEventLister事件
2. 组件的事件绑定   
    - 组件是自定义事件和native事件
    - 自定义事件是通过发布订阅来监听的, $on方法
    - native事件就是原生的事件

## 29.v-model中的实现原理及如何自定义v-model
理解：
1. v-model可以看成是value + input方法的语法糖
    - 原生的v-model，会根据标签的type不同生成不同的属性和事件，比如checkbox会生成checked和change事件
    - v-model.lazy的时候也是会调change事件的
2. 组件的v-model是value + input方法的语法糖
```
<test :value="check" @input=""></test> 
等价
<test v-model="check"></test>
```
可以通过组件的model属性自定义v-model

默认的prop是value，event是input
```
model: {
    prop: 'check',  // 更改默认value的名字
    event: 'change' // 更改默认的方法名
}
```

## 30.Vue中的v-html会导致哪些问题
理解：
- 可能会导致xss攻击
- v-html会替换掉标签内的所有元素，innerHTML修改绑定元素的内容

## 31.Vue父子组件生命周期调用顺序
- 组件的调用顺序都是先父后子，渲染完成的顺序肯定是先子后父
- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父
- 加载渲染过程
    - 父beforeCreate -> 父created -> 父beforeMount
    - 子beforeCreate -> 子created -> 子beforeMount -> 子mounted
    - 父mounted
- 子组件更新过程
    - 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
- 父组件更新过程
    - 父beforeUpdate -> 父updated
- 销毁过程
    - 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed

## 32.Vue组件如何通信
单向数据流
1. 父子间通信 父->子通过props， 子$emit->父$on
    - $emit|$on是发布订阅
2. 获取父子组件实例的方式 `$parent、$children`
    - 初始化生命周期的时候会在实例上挂两个属性一个是$parent,一个是$children = []
3. 在父组件中提供数据，`provide`,子组件进行依赖注入`inject`
    - inject会不停的循环父级，看看有没有provide属性，如果找到了就通过`defineReactive`添加响应式
4. `ref`获取实例的方式调用组件的属性或者方法
5. `Event Bus`实现跨组件通信
    - 基于$on|$emit，每个实例上都有这两个方法
    - 所以它的原理就是让Vue.prototype.$bus = new Vue
6. `Vuex`状态管理实现通信

## 33.Vue中相同逻辑如何抽离
- Vue.mixin用法  给组件每个生命周期，函数等混入一些公共逻辑
- mixin源码：核心mergeOptions方法
    1. 将当前定义的属性合并到每个组件中
    2. 递归合并extends
    3. 组件里用到了mixin，就会递归的合并mixin
    4. 属性及生命周期的合并 放到一个数组里然后去遍历这个数组依次执行

## 34.为什么要使用异步组件
理解：
- 如果组件功能多打包出的结果会变大，可以采用异步的方式加载组件
- 异步组件一定是个函数
- 主要依赖import()语法(实际上就是jsonp)，可以实现文件的分割加载

## 35.插槽和作用域插槽区别
理解： 渲染的作用域不同
1. 插槽
- 创建组件虚拟节点时，会将组件儿子的虚拟节点保存起来。当初始化组件时，通过插槽属性将儿子进行分类`{a: [vnode], b: [vnode]}`
- 渲染组件时会拿对应slot属性的节点进行替换操作（作用域为父组件）
2. 作用域插槽
- 作用域插槽在解析的时候，不会作为组件的孩子节点。会解析成函数，当子组件渲染时，会调用此函数进行渲染（作用域为子组件）

## 36.谈谈你对keep-alive的了解
理解：
- keep-alive可以实现组件的缓存，当组件切换时不会对当前组件进行卸载
- 常用的2个属性include/exclude, 2个生命周期activated, deactivated

## 37.Vue中常见性能优化
1. 编码优化
- 1. 不要把所有的数据都放到data中，data中的数据会增加getter和setter，会收集对应的watcher
- 2. vue在`v-for`时给每项元素绑定事件时需要用事件代理
- 3. SPA页面采用keep-alive缓存组件
- 4. 拆分组件(提高复用性，增加代码的可维护性，减少不必要的渲染)
- 5. v-if为false时，内部指令不会执行，具有阻断的功能，很多情况下使用v-if代替v-show
- 6. v-for时一定要加key保证唯一性
- 7. Object.freeze冻结数据
- 8. 合理使用路由懒加载和异步组件
- 9. 数据持久化（防抖，节流）
2. 加载优化
- 第三方模块按需导入(babel-plugin-component)
- 滚动到可视区动态加载(vue-virtual-scroll-list)
- 图片懒加载(vue-lazyload)
3. 用户体验
- app-skeleton 骨架屏
- app-shell app壳
4. 打包优化
- cdn加载第三方模块
- splitChunks抽离代码
- sourceMap生成
- 多进程打包happypack

## 38.Vue3.0有哪些改进
- Vue3采用TS来编写
- 支持`Composition API`
    - mixin的缺陷和代码更有条理性，保证代码逻辑耦合
- 响应式原理改成proxy
    - 提升性能，Vue2里的data只要初始化就递归，增加拦截，性能不高
- vdom的对比算法更新，只更新vdom的绑定了动态数据的部分

## 39.实现hash路由和history路由
- onhashchange
- history.pushState     监听popState

## 40.Vue-Router中导航守卫有哪些？

## 41.action和mutation的区别
- mutation是同步更新数据(内部会进行是否为异步方式更新的检测) $watch监听，严格模式下会报错
- action异步操作，可以获取数据后，调用mutation提交最终数据

## 42.简述Vuex工作原理
Vuex图
- store中state状态渲染vue组件
- 组件通过dispatch去调用actions行为获取数据
- actions行为通过commit提交给mutations
- mutations再去改变store里数据的状态
- 重复循环以上过程