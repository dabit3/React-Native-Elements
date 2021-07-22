import React from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  StatusBar,
  I18nManager,
  ViewStyle,
  StyleProp,
  ColorValue,
  Platform,
  Dimensions,
} from 'react-native';
import Triangle from './components/Triangle';
import { ScreenWidth, isIOS, RneFunctionComponent } from '../helpers';
import { getElementVisibleWidth } from './getTooltipCoordinate';
import { getTooltipStyle } from './getTooltipStyle';

export type TooltipProps = {
  visible?: boolean;
  withPointer?: boolean;
  popover?: React.ReactElement<{}>;
  toggleOnPress?: boolean;
  toggleAction?: string | 'onPress' | 'onLongPress';
  height?: number;
  width?: number;
  containerStyle?: StyleProp<ViewStyle>;
  pointerColor?: ColorValue;
  onClose?(): void;
  onOpen?(): void;
  overlayColor?: ColorValue;
  withOverlay?: boolean;
  backgroundColor?: ColorValue;
  highlightColor?: ColorValue;
  skipAndroidStatusBar?: boolean;
  closeOnlyOnBackdropPress?: boolean;
  ModalComponent?: typeof React.Component;
  pointerStyle?: StyleProp<ViewStyle>;
};

export const Tooltip: RneFunctionComponent<TooltipProps> = ({
  withOverlay = true,
  theme,
  overlayColor = '#fafafa14',
  highlightColor = 'transparent',
  withPointer = true,
  toggleOnPress = true,
  toggleAction = 'onPress',
  height = 40,
  width = 150,
  containerStyle = {},
  backgroundColor = '#617080',
  pointerColor = backgroundColor,
  pointerStyle,
  onClose = () => {},
  onOpen = () => {},
  visible = false,
  skipAndroidStatusBar = false,
  ModalComponent = Modal,
  closeOnlyOnBackdropPress = false,
  ...props
}) => {
  const isMounted = React.useRef(false);
  const renderedElement = React.useRef<View>(null);

  const [dimensions, setDimensions] = React.useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });

  const getElementPosition = React.useCallback(() => {
    renderedElement.current &&
      renderedElement.current.measure(
        (
          _frameOffsetX,
          _frameOffsetY,
          _width,
          _height,
          pageOffsetX,
          pageOffsetY
        ) => {
          isMounted.current &&
            setDimensions({
              xOffset: pageOffsetX,
              yOffset:
                isIOS || skipAndroidStatusBar
                  ? pageOffsetY
                  : pageOffsetY -
                    Platform.select({
                      android: StatusBar.currentHeight,
                      ios: 20,
                      default: 0,
                    }),
              elementWidth: _width,
              elementHeight: _height,
            });
        }
      );
  }, [skipAndroidStatusBar]);

  const handleOnPress = React.useCallback(() => {
    getElementPosition();
    isMounted.current && (visible ? onClose?.() : onOpen?.());
  }, [getElementPosition, onClose, onOpen, visible]);

  const WrapWithPress: React.FC = ({ children }) => {
    if (toggleOnPress) {
      return (
        <TouchableOpacity
          {...{ [toggleAction]: handleOnPress }}
          delayLongPress={250}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      );
    } else {
      return <>{children}</>;
    }
  };

  const Pointer: React.FC<{
    tooltipY: number | string;
  }> = ({ tooltipY }) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = dimensions;
    const pastMiddleLine = yOffset > (tooltipY || 0);
    if (!withPointer) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          [I18nManager.isRTL ? 'right' : 'left']:
            xOffset +
            getElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 -
            7.5,
        }}
      >
        <Triangle
          style={pointerStyle}
          pointerColor={pointerColor}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };

  const TooltipHighlightedButtonStyle = React.useMemo<ViewStyle>(() => {
    const { yOffset, xOffset, elementWidth, elementHeight } = dimensions;
    return {
      position: 'absolute',
      top: yOffset,
      [I18nManager.isRTL ? 'right' : 'left']: xOffset,
      backgroundColor: highlightColor,
      overflow: 'visible',
      width: elementWidth,
      height: elementHeight,
    };
  }, [dimensions, highlightColor]);

  const HighlightedButton: React.FC = () => {
    if (closeOnlyOnBackdropPress) {
      return (
        <TouchableOpacity
          testID="tooltipTouchableHighlightedButton"
          onPress={handleOnPress}
          style={TooltipHighlightedButtonStyle}
        >
          {props.children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={TooltipHighlightedButtonStyle}>{props.children}</View>
      );
    }
  };

  React.useEffect(() => {
    isMounted.current = true;
    // Wait till element's position is calculated
    requestAnimationFrame(getElementPosition);
    return () => {
      isMounted.current = false;
    };
  }, [getElementPosition]);

  /**
   * Listen for change in layout, i.e. Portrait or Landscape
   */
  React.useEffect(() => {
    Dimensions.addEventListener('change', getElementPosition);
    return () => {
      Dimensions.removeEventListener('change', getElementPosition);
    };
  }, [getElementPosition]);

  /**
   * Calculate position of tooltip
   */
  const tooltipStyle = React.useMemo(
    () =>
      getTooltipStyle({
        ...dimensions,
        backgroundColor,
        containerStyle,
        height,
        width,
        withPointer,
      }),
    [backgroundColor, containerStyle, dimensions, height, width, withPointer]
  );

  return (
    <View collapsable={false} ref={renderedElement}>
      <WrapWithPress>{props.children}</WrapWithPress>
      <ModalComponent
        transparent
        visible={visible}
        onShow={onOpen}
        animationType="fade"
      >
        <TouchableOpacity
          style={{
            backgroundColor: withOverlay ? overlayColor : 'transparent',
            flex: 1,
          }}
          onPress={handleOnPress}
          activeOpacity={1}
        >
          <View>
            <HighlightedButton />
            <Pointer tooltipY={tooltipStyle.top} />
            <View style={tooltipStyle} testID="tooltipPopoverContainer">
              {props.popover}
            </View>
          </View>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

Tooltip.displayName = 'Tooltip';
