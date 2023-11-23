import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import RandomJoke from '../screens/RandomJoke';
import { withErrorWrapper } from './withErrorWrapper';
import { theme } from '../utils/theme';

export type RootStackParamList = {
  Main: undefined;
  JokesScreens: { slug: string };
  JokesScreenWithToast: { slug: string };
  JokesScreenWithFullScreen: { slug: string };
};

const MainStack = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false, title: '' }}
    />
    <Stack.Screen
      name="JokesScreens"
      component={withErrorWrapper(<RandomJoke />, {
        notificationType: 'fullScreen',
      })}
      options={{
        title: 'Random jokes',
        headerTintColor: theme.colorWhite,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="JokesScreenWithToast"
      component={withErrorWrapper(<RandomJoke />, {
        notificationType: 'toast',
      })}
      options={{
        title: 'Random jokes',
        headerTintColor: theme.colorWhite,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="JokesScreenWithFullScreen"
      options={{
        title: 'Random jokes',
        headerTintColor: theme.colorPrimaryBlue,
        headerTransparent: true,
      }}
      component={withErrorWrapper(<RandomJoke />, {
        notificationType: 'fullScreen',
      })}
    />
  </Stack.Navigator>
);

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigation;
