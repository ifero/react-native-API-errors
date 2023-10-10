import { RouteProp, useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { FC, useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/Navigation';

import useSWR from 'swr';
import { Button } from '../components/Button';
import { flex1, theme } from '../utils/theme';

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

  const { data, error, mutate } = useSWR(slug ?? '/random');
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();

  const refreshJoke = useCallback(() => {
    setIndex((oldVal) => (oldVal + 1) % norrisImagesPaths.length);
    mutate();
  }, [mutate]);

  return (
    <SafeAreaView
      style={{
        paddingTop: headerHeight - top,
        ...styles.safeArea,
      }}
    >
      <View style={flex1}>
        <View style={styles.imageContainer}>
          <Image
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colorSecondaryAccent,
    paddingHorizontal: theme.space16,
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
