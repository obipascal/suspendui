import { Component } from "react";
import PropTypes from "prop-types";

/**
 * SuspendUI and fetch resources from api server.
 *
 * @template SuspendUI
 */
class SuspendUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** by default render loader while resources are been fetched. */
      suspendui: true,
      /** if api server request fails render error fallbak  */
      hasError: false,
    };
  }

  componentDidMount() {
    var fetch = this.props.fetch,
      isFunc;

    isFunc = typeof fetch === "function";
    if (isFunc) {
      fetch()
        .then((result) => {
          // display ui components when promise is resolved
          this.setState({ suspendui: false, hasError: false });
        })
        .catch((err) => {
          this.setState({ suspendui: false, hasError: true });
        });
    } else {
      throw new Error("Fetch prop must be a function.");
    }
  }

  render() {
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
}

/* Validation for allowed props types  */
SuspendUI.propTypes = {
  /** @type {Function} */
  loader: PropTypes.func,
  /** @type {Function}  */
  errorfallback: PropTypes.func,
  /**
   * @type {Function}
   */
  fetch: PropTypes.func,
};

export { SuspendUI };
