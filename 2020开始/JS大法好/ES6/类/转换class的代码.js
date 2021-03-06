"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol": typeof obj;
        };
    }
    return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf: function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
// 检测实例属不属于这个类
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !! right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
// 如果不是该类所创造的实例就报错
function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Animal = function() {
    _createClass(Animal, null, [{
        key: "who",
        value: function who() {
            return '你是谁';
        }
    }]);

    function Animal(name) {
        _classCallCheck(this, Animal);
        this.name = name;
        this.eat = '吃肉肉';
    }

    _createClass(Animal, [{
        key: "say",
        value: function say() {
            // 原型上的方法
            console.log('你是什么动物', this.name);
        }
    }]);

    return Animal;
} ();

var a = new Animal('黑猩猩');
a.say();

var Tiger = function(_Animal) {
    _inherits(Tiger, _Animal);

    // 继承实例+原型
    function Tiger(name) {
        _classCallCheck(this, Tiger);

        return _possibleConstructorReturn(this, _getPrototypeOf(Tiger).call(this, name)); // 相当于Animal.call(this, name)
    }

    return Tiger;
} (Animal);

var tiger = new Tiger('大老虎');
console.log(Tiger.who());