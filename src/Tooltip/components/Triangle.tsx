import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from 'react-native';

type TriangleProps = {
  pointerColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  isDown?: boolean;
};

const Triangle: React.FC<TriangleProps> = ({ style, pointerColor, isDown }) => (
  <View
    style={StyleSheet.flatten([
      styles.triangle,
      {
        borderBottomColor: pointerColor,
      },
      style,
      isDown ? styles.down : {},
    ])}
  />
);

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

export default React.memo(Triangle);
