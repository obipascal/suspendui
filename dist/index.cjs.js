'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var PropTypes = _interopDefault(require('prop-types'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/**
 * Suspend ui and fetch resources from api server.
 *
 * @template SuspendUI
 */

var SuspendUI = /*#__PURE__*/function (_Component) {
  _inherits(SuspendUI, _Component);

  var _super = _createSuper(SuspendUI);

  function SuspendUI(props) {
    var _this;

    _classCallCheck(this, SuspendUI);

    _this = _super.call(this, props);
    _this.state = {
      /** by default render loader while resources are been fetched. */
      suspendui: true,

      /** if api server request fails render error fallbak  */
      hasError: false
    };
    return _this;
  }

  _createClass(SuspendUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      /** @type {Function} */
      var fetch = this.props.fetch,
          isFunc;
      isFunc = typeof fetch === "function";

      if (isFunc) {
        fetch().then(function (result) {
          // display ui components when promise is resolved
          _this2.setState({
            suspendui: false,
            hasError: false
          });
        }).catch(function (err) {
          _this2.setState({
            suspendui: false,
            hasError: true
          });
        });
      } else {
        throw new Error("Fetch prop must be a function.");
      }
    }
  }, {
    key: "render",
    value: function render() {
      /* 
        When the component is initally mounted it display 
        the loader while fetch resources from api server.
        But as soon as the resources are fetch and the server return 
        good response the ctrl is passed to the third if statement.
      */
      if (this.state.suspendui) {
        return this.props.loader();
      }
      /* 
        When the hasError occourd it means that the api server 
        return or the request lib return a promise that was rejected.
        The error fallback component is render to the user.
      */


      if (this.state.hasError) {
        return this.props.errorfallback();
      }
      /**
       * At this point return the children of the UISuspense
       * since all the is good.
       * ____
       * The api server return the data as expected and the
       * resources data has been consumed by state or context update
       */


      if (!this.state.hasError && !this.state.suspendui) {
        return this.props.children;
      }
    }
  }]);

  return SuspendUI;
}(react.Component);
/* Validation for allowed props types  */


SuspendUI.propTypes = {
  /** @type {Function} */
  loader: PropTypes.func,

  /** @type {Function}  */
  errorfallback: PropTypes.func,

  /**
   * @type {Function}
   */
  fetch: PropTypes.func
};

exports.SuspendUI = SuspendUI;
