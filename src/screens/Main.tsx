import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../navigation/Navigation';
import { flex1, theme } from '../utils/theme';
import { Button } from '../components/Button';

const Main: FC = () => {
  const { navigate } = useNavigation<NavigationProps>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={flex1}>
        <Text style={styles.title}>
          Chuck Norris jokes{'\n'}
          <Text style={styles.subtitle}>which are not funny</Text>
        </Text>
        <View style={styles.spacing} />
        <View style={styles.buttonsContainer}>
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
          <Text>
            This is {Platform.OS === 'android' ? 'Android' : 'iOS'} simulator
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorPrimaryAccent,
    paddingHorizontal: theme.space16,
  },
  spacing: { flex: 1, flexGrow: 1 },
  buttonsContainer: {
    gap: theme.space16,
  },
  title: {
    fontFamily: theme.fontExtraBold,
    fontSize: theme.fontSize72,
    color: theme.colorPrimaryBlue,
  },
  subtitle: {
    fontSize: theme.fontSize36,
  },
});

export default Main;
