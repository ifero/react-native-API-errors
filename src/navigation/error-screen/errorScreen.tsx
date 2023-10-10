import Toast from 'react-native-toast-message';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { theme } from '../../utils/theme';
import { Button } from '../../components/Button';

export type Action = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  action: () => void;
  label: string;
  testID?: string;
};

export type NotificationType = 'toast' | 'fullScreen';

type Props = {
  actions: Action[];
  description?: string;
  isVisible: boolean;
  notificationType: NotificationType;
};

export const ErrorScreen: FC<PropsWithChildren<Props>> = ({
  actions,
  children,
  isVisible,
  description,
  notificationType,
}) => {
  const opacityAnimatedValue = useRef(new Animated.Value(0)).current;
  const zIndex = useRef(-9990);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (isVisible && notificationType === 'toast') {
      Toast.show({
        autoHide: false,
        type: 'error',
        text1: 'Nice job, you broke it!',
        text2: description,
        position: 'bottom',
      });
    }
    if (isVisible && notificationType === 'fullScreen') {
      zIndex.current = 9999;
      Animated.timing(opacityAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    if (!isVisible) {
      zIndex.current = -9999;
      Animated.timing(opacityAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Toast.hide();
    }
    return () => {
      Toast.hide();
    };
  }, [description, isVisible, notificationType, opacityAnimatedValue]);

  return (
    <>
      <Animated.View
        testID="animatedView"
        style={{
          opacity: opacityAnimatedValue,
          zIndex: zIndex.current,
          paddingTop: headerHeight,
          ...styles.errorScreen,
        }}
      >
        <Image
          source={require('../../../assets/bruce-lee.jpeg')}
          resizeMode="contain"
          style={styles.image}
        />

        <Text style={styles.text1}>Nice job{'\n'}you broke it</Text>
        <Text style={styles.text2}>{description}</Text>
        {actions.map((action) => (
          <Button
            buttonType="secondary"
            title={action.label}
            onPress={action.action}
          />
        ))}
      </Animated.View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  errorScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    paddingHorizontal: theme.space16,
    backgroundColor: theme.colorWhite,
    alignItems: 'center',
  },
  image: { width: '100%', height: 300, marginTop: theme.space32 },
  text1: {
    textAlign: 'center',
    fontFamily: theme.fontBold,
    fontSize: theme.fontSize36,
    marginVertical: theme.space24,
  },
  text2: {
    textAlign: 'center',
    fontFamily: theme.fontRegular,
    fontSize: theme.fontSize18,
    marginBottom: theme.space16,
  },
});
