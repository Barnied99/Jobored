import { Component } from 'react';
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export type Props = {
  children: React.ReactNode;
};



class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  icon = <IconInfoCircle />;


  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="filled" color="red" withCloseButton title="Alert " radius="md" icon={this.icon}>
          Something went wrong!        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;




