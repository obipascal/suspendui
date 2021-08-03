import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * A function component version of SuspendUI with more improve functionality.
 */

function Suspense(_ref) {
  var children = _ref.children,
      _ref$Loader = _ref.Loader,
      Loader = _ref$Loader === void 0 ? /*#__PURE__*/React.createElement("span", null, "Loading...") : _ref$Loader,
      _ref$Fallbackui = _ref.Fallbackui,
      Fallbackui = _ref$Fallbackui === void 0 ? /*#__PURE__*/React.createElement("span", null, "Something went wrong") : _ref$Fallbackui,
      _ref$fetch = _ref.fetch,
      fetch = _ref$fetch === void 0 ? function () {} : _ref$fetch,
      _ref$autoRefetch = _ref.autoRefetch,
      autoRefetch = _ref$autoRefetch === void 0 ? false : _ref$autoRefetch,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 30000 : _ref$delay;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      suspend = _useState2[0],
      setSuspend = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasError = _useState4[0],
      setHasError = _useState4[1];

  var cleanUp = function cleanUp() {
    if (autoRefetch) {
      var interValid = setInterval(function () {
        setSuspend(true);
        setHasError(false);
      }, delay);
      return interValid;
    }

    return null;
  };

  useEffect(function () {
    // initally call the fetch if the suspend is true
    if (suspend) {
      // determin if the fetch methon contains
      // a promise chaining of then and catch
      if (typeof fetch === "function") {
        fetch().then(function (res) {
          return setSuspend(false);
        }).catch(function (error) {
          return setHasError(true);
        });
      }
    }

    var timerId = cleanUp();
    return function () {
      if (timerId !== null) {
        window.clearInterval(timerId);
      }
    };
  }, [suspend, hasError]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, suspend === true && hasError === false ? Loader : "", hasError === true && suspend === false ? Fallbackui : "", suspend === false && hasError == false ? children : "");
}

/**
 * SuspendUI and fetch resources from api server.
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
}(Component);
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

var index = {
  SuspendUI: SuspendUI,
  Suspense: Suspense
};

export default index;
