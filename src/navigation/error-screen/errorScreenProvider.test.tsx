import { render, screen, fireEvent } from '../../utils/testingLibrary';
import { APIErrorContext, ErrorScreenProvider } from './errorScreenProvider';
import { useContext } from 'react';
import { Text } from 'react-native';
import { Button } from '../../components/Button';

global.fetch = jest.fn();

describe('ErrorScreenProvider', () => {
  it('renders children without error', () => {
    render(
      <ErrorScreenProvider>
        <Text>Test</Text>
      </ErrorScreenProvider>,
    );

    expect(screen.getByText('Test')).toBeVisible();
  });

  it('should provide the correct context values', () => {
    const TestComponent = () => {
      const context = useContext(APIErrorContext);
      return <Text>{context.visible.toString()}</Text>;
    };

    render(
      <ErrorScreenProvider>
        <TestComponent />
      </ErrorScreenProvider>,
    );

    expect(screen.getByText('false')).toBeVisible();
  });

  it('should handle error correctly', () => {
    const TestComponent = () => {
      const { setIsVisible, visible } = useContext(APIErrorContext);
      const handleClick = () => setIsVisible();
      return (
        <>
          <Button title="Set error visible" onPress={handleClick} />
          <Text>{visible.toString()}</Text>
        </>
      );
    };

    render(
      <ErrorScreenProvider>
        <TestComponent />
      </ErrorScreenProvider>,
    );

    fireEvent.press(screen.getByText('Set error visible'));
    expect(screen.getByText('true')).toBeVisible();
  });
});
