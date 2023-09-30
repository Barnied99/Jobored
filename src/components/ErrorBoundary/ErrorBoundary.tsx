import { Component } from 'react';

export type Props = {
  children: React.ReactNode;
};

export type RootState = {
  tasklist: {
    id: string,
    text: string
  }
  user: { email: string };
};

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p >Something went wrong!</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
