import React from "react";
import { Text } from "react-native";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong!</Text>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
