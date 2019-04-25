import React, { Component } from 'react';
import { loadingIndicator } from "../LoadingIndicator";
const messages = new Map().set('loading', loadingIndicator).set('notFound', '404 Not Found').set('internalError', '500 Internal Server Error');

class ErrorView extends Component {
  render() {
    const {
      loading,
      notFound
    } = this.props;
    const message = loading ? messages.get('loading') : notFound ? messages.get('notFound') : messages.get('internalError');
    return React.createElement("h1", null, message);
  }

}

export default ErrorView;
//# sourceMappingURL=errorView.js.map