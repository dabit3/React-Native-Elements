import { I18nManager, StyleSheet, ViewStyle } from 'react-native';
import { ScreenWidth, ScreenHeight } from '../helpers';
import getTooltipCoordinate from './getTooltipCoordinate';

export const getTooltipStyle = ({
  yOffset,
  xOffset,
  elementHeight,
  elementWidth,
  width,
  height,
  withPointer,
  backgroundColor,
  containerStyle,
}): ViewStyle => {
  const { x, y } = getTooltipCoordinate(
    xOffset,
    yOffset,
    elementWidth,
    elementHeight,
    ScreenWidth,
    ScreenHeight,
    width,
    height,
    withPointer
  );
  return StyleSheet.flatten([
    {
      position: 'absolute',
      [I18nManager.isRTL ? 'right' : 'left']: x,
      top: y,
      width,
      height,
      backgroundColor,
      // default styles
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
    },
    containerStyle,
  ]);
};
