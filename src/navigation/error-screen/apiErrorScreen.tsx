import { FC, PropsWithChildren, useContext } from 'react';
import { APIErrorContext } from './errorScreenProvider';

import { Action, ErrorScreen, NotificationType } from './errorScreen';

type Props = {
  notificationType: NotificationType;
};

export const APIErrorScreen: FC<PropsWithChildren<Props>> = ({
  children,
  notificationType,
}) => {
  const { refreshFunction, setIsHidden, visible, errorDescription } =
    useContext(APIErrorContext);

  const refresh = () => {
    setIsHidden();
    refreshFunction?.();
    console.log('[API-error-screen][💡] Hide error screen and refresh');
  };

  const refreshAction: Action = {
    action: refresh,
    label: 'Refresh',
    testID: 'refresh',
  };

  return (
    <ErrorScreen
      isVisible={visible}
      actions={[refreshAction]}
      notificationType={notificationType}
      description={errorDescription?.message}
    >
      {children}
    </ErrorScreen>
  );
};
