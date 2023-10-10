import * as React from 'react';
import { View } from 'react-native';

type Props = {
  width?: number;
  height?: number;
};

export const Spacer: React.FC<Props> = ({ width, height }) => {
  return <View style={{ width, height }} />;
};
