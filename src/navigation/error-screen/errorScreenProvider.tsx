import {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { createContext } from 'react';
import {
  KeyedMutator,
  Middleware,
  SWRConfig,
  SWRConfiguration,
  SWRResponse,
} from 'swr';

type ApiErrorContextType = {
  refreshFunction: KeyedMutator<any> | undefined;
  setIsHidden: () => void;
  setIsVisible: () => void;
  setSWRResponse: (response: SWRResponse) => void;
  setErrorDescription: (description: any) => void;
  visible: boolean;
  errorDescription?: any;
};

export const APIErrorContext = createContext<ApiErrorContextType>({
  refreshFunction: undefined,
  errorDescription: undefined,
  setIsHidden: () => true,
  setIsVisible: () => true,
  setErrorDescription: () => true,
  setSWRResponse: () => true,
  visible: false,
});

const apiErrorMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const { setIsVisible, setSWRResponse, setErrorDescription } =
      useContext(APIErrorContext);

    const onError: SWRConfiguration['onError'] = useCallback(
      (error: any, path: string) => {
        if (error?.status !== 401) {
          console.log(
            `[swr][🐛] Request ${path} failed. Showing API error screen`,
          );
          setIsVisible();
          setSWRResponse(swr);
          setErrorDescription(error?.info);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setIsVisible, setSWRResponse, setErrorDescription],
    );

    const swr = useSWRNext(key, fetcher, {
      ...config,
      onError,
    });

    return swr;
  };
};

export const ErrorScreenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [swrResponse, setSWRResponse] = useState<SWRResponse | undefined>();
  const [errorDescription, setErrorDescription] = useState<object>();

  const setAsVisible = () => setIsVisible(true);

  const setAsHidden = () => setIsVisible(false);

  const setResponse = (swr: SWRResponse) => setSWRResponse(swr);

  const setDescription = (description: object) =>
    setErrorDescription(description);

  return (
    <APIErrorContext.Provider
      value={{
        refreshFunction: swrResponse?.mutate,
        setIsHidden: setAsHidden,
        setIsVisible: setAsVisible,
        setSWRResponse: setResponse,
        setErrorDescription: setDescription,
        errorDescription,
        visible: isVisible,
      }}
    >
      <SWRConfig value={{ use: [apiErrorMiddleware] }}>{children}</SWRConfig>
    </APIErrorContext.Provider>
  );
};
