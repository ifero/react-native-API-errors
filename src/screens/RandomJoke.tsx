import { RouteProp, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { FC, useCallback, useState } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/Navigation';

import { Button } from '../components/Button';
import { flex1, theme } from '../utils/theme';
import { useGetJokes } from '../hooks/useGetJokes';

const norrisImagesPaths = [
  require('../../assets/chuck-judging.png'),
  require('../../assets/chuck-thumb.png'),
  require('../../assets/chuck-laugh-1.jpg'),
  require('../../assets/chuck-laugh-2.jpg'),
  require('../../assets/chuck-laugh-3.jpg'),
];

const norrisMad = require('../../assets/chuck-mad.png');

const RandomJoke: FC = () => {
  const [index, setIndex] = useState(0);
  const {
    params: { slug },
  } = useRoute<RouteProp<RootStackParamList, 'JokesScreens'>>();

  const { data, error, mutate } = useGetJokes(slug);
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();

  const refreshJoke = useCallback(() => {
    setIndex((oldVal) => (oldVal + 1) % norrisImagesPaths.length);
    mutate();
  }, [mutate]);

  const openJokeLink = useCallback(async () => {
    if (data?.url && (await Linking.canOpenURL(data?.url))) {
      Linking.openURL(data?.url);
    }
  }, [data?.url]);

  return (
    <SafeAreaView
      style={{
        paddingTop: headerHeight - top,
        ...styles.safeArea,
      }}
    >
      <View style={styles.container}>
        <View style={flex1}>
          <View style={styles.imageContainer}>
            <Image
              testID={error ? 'madTestID' : 'norrisImageTestID'}
              source={error ? norrisMad : norrisImagesPaths[index]}
              resizeMode="cover"
              style={styles.image}
            />
          </View>

          <Text
            style={{
              ...styles.text,
              textAlign: error ? 'center' : 'justify',
            }}
          >
            {error ? 'How dare you! ' : data?.value}
          </Text>
        </View>

        <Button onPress={refreshJoke} title="Refresh" />
        <View style={{ height: 16 }} />
        <Button onPress={openJokeLink} title="Open in browser" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colorSecondaryAccent,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: theme.colorPrimaryAccent,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignSelf: 'center',
  },
  text: {
    fontSize: theme.fontSize20,
    fontFamily: theme.fontMediumItalic,
    color: theme.colorWhite,
    marginTop: theme.space24,
  },
});

export default RandomJoke;
