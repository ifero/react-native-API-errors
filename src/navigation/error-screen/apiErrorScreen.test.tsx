import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../utils/testingLibrary';
import { APIErrorScreen } from './apiErrorScreen';
import { APIErrorContext } from './errorScreenProvider';
import Toast from 'react-native-toast-message';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.spyOn(Toast, 'hide').mockReturnValue();
jest.spyOn(Toast, 'show').mockReturnValue();

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 0,
}));

jest.useFakeTimers();

const App = () => {
  return <Text>TEXT TO SHOW</Text>;
};

describe('given an ApiErrorScreen component', () => {
  describe('when the api call is successful', () => {
    it('should render the right content', async () => {
      render(
        <APIErrorContext.Provider value={{ visible: false } as any}>
          <APIErrorScreen notificationType="fullScreen">
            <App />
          </APIErrorScreen>
        </APIErrorContext.Provider>,
      );

      expect(screen.getByText('TEXT TO SHOW')).toBeDefined();
    });
  });

  describe('when the api call fails', () => {
    it('should render the error content', () => {
      render(
        <APIErrorContext.Provider value={{ visible: true } as any}>
          <APIErrorScreen notificationType="fullScreen">
            <App />
          </APIErrorScreen>
        </APIErrorContext.Provider>,
      );

      expect(screen.getByText('Nice job you broke it')).toBeDefined();
      expect(screen.getByText('Refresh')).toBeDefined();
    });

    describe('when refresh button is pressed', () => {
      it('should hide the error screen and refresh the api call', () => {
        const mockSetIsHidden = jest.fn();
        const mockRefreshFunction = jest.fn();
        render(
          <APIErrorContext.Provider
            value={
              {
                refreshFunction: mockRefreshFunction,
                setIsHidden: mockSetIsHidden,
                visible: true,
              } as any
            }
          >
            <APIErrorScreen notificationType="fullScreen">
              <App />
            </APIErrorScreen>
          </APIErrorContext.Provider>,
        );

        fireEvent.press(screen.getByText('Refresh'));

        expect(mockSetIsHidden).toHaveBeenCalledTimes(1);
        expect(mockRefreshFunction).toHaveBeenCalledTimes(1);
      });
    });
  });
});
