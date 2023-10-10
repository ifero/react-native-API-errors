import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../utils/testingLibrary';
import { Action, ErrorScreen } from './errorScreen';
import Toast from 'react-native-toast-message';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

const hideSpy = jest.spyOn(Toast, 'hide').mockReturnValue();
const showSpy = jest.spyOn(Toast, 'show').mockReturnValue();

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 0,
}));

jest.useFakeTimers();

describe('given an ErrorScreen component', () => {
  describe('when the notification type is full screen', () => {
    describe('when the error is not triggered', () => {
      it('should show the children screen', () => {
        render(
          <ErrorScreen
            notificationType="fullScreen"
            isVisible={false}
            actions={[]}
          >
            <Text>Text to show</Text>
          </ErrorScreen>,
        );

        expect(screen.getByText('Text to show')).toBeVisible();
      });
    });

    describe('when the error is triggered', () => {
      it('should show the error screen', () => {
        render(
          <ErrorScreen notificationType="fullScreen" isVisible actions={[]}>
            <Text>Text to show</Text>
          </ErrorScreen>,
        );

        expect(screen.getByText('Nice job you broke it')).toBeDefined();
      });

      describe('when actions are defined', () => {
        const mockAction = jest.fn();

        const actions: Action[] = [
          {
            action: mockAction,
            label: 'action label',
          },
        ];

        it('should show the defined actions', () => {
          render(
            <ErrorScreen
              notificationType="fullScreen"
              isVisible
              actions={actions}
            />,
          );

          expect(screen.getByText('action label')).toBeDefined();
        });

        it('should trigger the defined actions on press', () => {
          render(
            <ErrorScreen
              notificationType="fullScreen"
              isVisible
              actions={actions}
            />,
          );

          fireEvent.press(screen.getByText('action label'));

          expect(mockAction).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('when the notification type is toast', () => {
    describe('when the error is not triggered', () => {
      it('should not call the toast show event', () => {
        render(
          <ErrorScreen notificationType="toast" isVisible={false} actions={[]}>
            <Text>Text to show</Text>
          </ErrorScreen>,
        );

        expect(showSpy).not.toHaveBeenCalled();
      });
    });

    describe('when the error is triggered', () => {
      it('should show the error screen', () => {
        render(
          <ErrorScreen notificationType="toast" isVisible actions={[]}>
            <Text>Text to show</Text>
          </ErrorScreen>,
        );

        expect(showSpy).toHaveBeenCalledWith({
          autoHide: false,
          type: 'error',
          text1: 'Nice job, you broke it!',
          text2: undefined,
          position: 'bottom',
        });
      });
    });
  });

  describe('on unmount', () => {
    it('should hide the toast message', () => {
      const element = render(
        <ErrorScreen notificationType="toast" actions={[]} isVisible={false} />,
      );

      element.unmount();

      expect(hideSpy).toHaveBeenCalled();
    });
  });
});
