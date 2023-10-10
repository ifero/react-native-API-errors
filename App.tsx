import { SWRConfig } from 'swr';
import Navigation from './src/navigation/Navigation';
import { fetcher } from './src/utils/http/fetcher';
import Toasts from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SWRConfig value={{ fetcher }}>
        <Navigation />
        <Toasts />
      </SWRConfig>
    </SafeAreaProvider>
  );
};

export default App;
