import { ReactElement } from 'react';
import {
  APIErrorScreen,
  ErrorScreenProvider,
  NotificationType,
} from './error-screen';

type Options = {
  notificationType: NotificationType;
};

export const withErrorWrapper =
  (component: ReactElement, { notificationType }: Options) =>
  () => {
    return (
      <ErrorScreenProvider>
        <APIErrorScreen notificationType={notificationType}>
          {component}
        </APIErrorScreen>
      </ErrorScreenProvider>
    );
  };
