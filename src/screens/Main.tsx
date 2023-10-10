import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../navigation/Navigation';
import { flex1, theme } from '../utils/theme';
import { Button } from '../components/Button';

const Main: FC = () => {
  const { navigate } = useNavigation<NavigationProps>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colorPrimaryAccent,
        paddingHorizontal: theme.space16,
      }}
    >
      <View style={flex1}>
        <Text
          style={{
            fontFamily: theme.fontExtraBold,
            fontSize: theme.fontSize72,
            color: theme.colorPrimaryBlue,
          }}
        >
          Chuck Norris jokes{'\n'}
          <Text style={{ fontSize: theme.fontSize36 }}>
            which are not funny
          </Text>
        </Text>
        <View style={{ flex: 1, flexGrow: 1 }} />
        <View style={{ gap: theme.space16 }}>
          <Button
            title="Get random jokes"
            onPress={() => navigate('JokesScreens', { slug: '/random' })}
          />
          <Button
            title="Get a Toast message error"
            onPress={() => navigate('JokesScreenWithToast', { slug: '/error' })}
          />
          <Button
            title="Get a Full screen error"
            onPress={() =>
              navigate('JokesScreenWithFullScreen', { slug: '/fault' })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
