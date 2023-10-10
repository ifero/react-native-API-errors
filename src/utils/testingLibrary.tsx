import { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SWRConfig } from 'swr';

const AllTheProviders = ({ children }: PropsWithChildren) => (
  <NavigationContainer>
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </SWRConfig>
  </NavigationContainer>
);

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from '@testing-library/react-native';

export const mockPlatform = (OS: 'ios' | 'android') => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
    OS,
    select: (objs: { [x: string]: any }) => objs[OS],
  }));
};

// override render method
export { customRender as render };
