import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container flex-center">
          <div className="glassmorphism text-center slide-up" style={{ padding: "3rem", maxWidth: "600px" }}>
            <h1 className="text-4xl font-bold mb-4 text-error">Oops! Something went wrong.</h1>
            <p className="subtitle mb-8 text-gray-300">
              The application encountered an unexpected error. Our tech monkeys are looking into it!
            </p>
            <button className="primary-btn" onClick={() => window.location.href = "/"}>
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
