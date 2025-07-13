import { Component } from 'react';

interface ErrorBoundaryTestProps {
  onThrowError: () => void;
}

class ErrorBoundaryTest extends Component<ErrorBoundaryTestProps> {
  render() {
    const { onThrowError } = this.props;
    return (
      <button onClick={onThrowError} style={{ marginTop: '10px' }}>
        Test Error Boundary
      </button>
    );
  }
}

export default ErrorBoundaryTest;
