import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';

interface ErrorBoundaryProps {}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  {
    hasError: boolean;
    error?: Error | null;
    errorInfo?: React.ErrorInfo | null;
  }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(prev => {
      return {
        ...prev,
        error,
        errorInfo,
      };
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorIllustrator
          desc={`错误信息：${this.state.error?.message ?? ''}`}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
