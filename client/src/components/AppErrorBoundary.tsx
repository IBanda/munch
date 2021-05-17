import { ErrorBoundary } from 'react-error-boundary';
import { Fade } from '@progress/kendo-react-animation';
import { Notification } from '@progress/kendo-react-notification';
import { Button } from '@progress/kendo-react-buttons';
import { useHistory } from 'react-router';
interface Props {
  children: React.ReactNode;
  onReset?: any;
}

export default function AppErrorBoundary({ children, onReset }: Props) {
  const history = useHistory();
  const reset = () => {
    if (onReset) {
      return onReset();
    }
    history.push('/places');
  };
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
}

function AppErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <Fade>
      <Notification
        type={{
          style: 'error',
          icon: true,
        }}
      >
        <div style={{ marginTop: '-0.2em' }}>
          {error.message}
          <Button
            onClick={resetErrorBoundary}
            className="small ml-1"
            look="outline"
          >
            Retry
          </Button>
        </div>
      </Notification>
    </Fade>
  );
}
