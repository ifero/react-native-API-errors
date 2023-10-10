import * as React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { IconProps } from './Icons';
import { Spacer } from './Spacer';
import { theme } from '../utils/theme';

interface IProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  buttonType?: 'primary' | 'secondary' | 'outline';
  icon?: React.FC<IconProps>;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({
  title,
  buttonType = 'primary',
  icon: Icon,
  disabled = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        buttonType === 'primary' ? styles.containerPrimary : {},
        buttonType === 'secondary' ? styles.containerSecondary : {},
        buttonType === 'outline' ? styles.containerOutline : {},
      ]}
      activeOpacity={theme.defaultActiveOpacity}
      onPress={onPress}
      disabled={disabled}
    >
      <>
        <Text
          style={[
            styles.buttonText,
            buttonType === 'primary' ? styles.buttonPrimaryText : {},
            buttonType === 'secondary' ? styles.buttonSecondaryText : {},
            buttonType === 'outline' ? styles.buttonOutlineText : {},
          ]}
        >
          {title}
        </Text>

        {Icon && (
          <>
            <Spacer width={theme.space8} />

            <Icon
              size={theme.fontSize16}
              color={
                buttonType === 'primary' ? theme.colorWhite : theme.colorBlack
              }
            />
          </>
        )}
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space24,
    paddingVertical: theme.space8,
    borderRadius: theme.borderRadius12,
    backgroundColor: theme.colorPrimaryBlue,
    borderWidth: theme.space2,
    borderColor: theme.colorPrimaryBlue,
  },
  containerPrimary: {
    backgroundColor: theme.colorPrimaryBlue,
    borderColor: theme.colorPrimaryBlue,
  },
  containerSecondary: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorWhite,
  },
  containerOutline: {
    backgroundColor: theme.colorTransparent,
    borderColor: theme.colorWhite,
  },
  buttonText: {
    fontFamily: theme.fontSemiBold,
    fontSize: theme.fontSize16,
  },
  buttonPrimaryText: {
    color: theme.colorWhite,
  },
  buttonSecondaryText: {
    color: theme.colorBlack,
  },
  buttonOutlineText: {
    color: theme.colorWhite,
  },
});
