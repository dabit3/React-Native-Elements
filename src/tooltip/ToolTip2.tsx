import React from 'react';
import {
  Modal,
  View,
  I18nManager,
  Pressable,
  ViewStyle,
  FlexStyle,
  StyleProp,
  StyleSheet,
  ColorValue,
} from 'react-native';
import { Animated, Text, SafeAreaView } from 'react-native';
import Triangle from './Triangle';
import { withTheme } from '../config';
import { ScreenWidth, ScreenHeight } from '../helpers';

export type ToolTip2Props = {
  variant?: 'grow' | 'fade' | 'zoom';
  withPointer?: boolean;
  title?: string;
  popover?: React.ReactElement<{}>;
  toggleOnPress?: boolean;
  toggleAction?: 'onPress' | 'onLongPress';
  height?: FlexStyle['height'];
  width?: FlexStyle['width'];
  containerStyle?: StyleProp<ViewStyle>;
  pointerColor?: ColorValue;
  onClose?(): void;
  onOpen?(): void;
  overlayColor?: ColorValue;
  backgroundColor?: ColorValue;
  highlightColor?: ColorValue;
  closeOnlyOnBackdropPress?: boolean;
};

const ToolTip2: React.FunctionComponent<ToolTip2Props> = ({
  children,
  title,
  popover,
  withPointer = true,
  overlayColor,
  backgroundColor = '#616161',
  pointerColor,
  variant = 'grow',
  toggleAction = 'onPress',
}) => {
  const { current: animation } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  let element = React.useRef<View>(null);

  const [open, setOpen] = React.useState(false);

  const [containerDimentions, setContainerDimentions] = React.useState({
    height: 0,
    px: 0,
    py: 0,
    width: 0,
  });

  const [tooltipDimention, setTooltipDimention] = React.useState({
    height: 0,
  });

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: Number(open),
      useNativeDriver: true,
      duration: 140,
    }).start();
  }, [open, animation]);

  React.useEffect(() => {
    requestAnimationFrame(
      () =>
        element.current &&
        element.current.measure((_x, _y, width, height, px, py) => {
          setContainerDimentions({ width, height, px, py });
        })
    );
  }, []);

  const growTransition = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1, 1],
          outputRange: [0.8, 1, 1],
        }),
      },
    ],
  };
  const zoomTransition = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  return (
    <>
      <Modal visible={open} transparent>
        <Pressable
          onPress={() => setOpen(!open)}
          pointerEvents={open ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: overlayColor || '#f1f1f122',
            },
          ]}
        />
      </Modal>

      <View
        style={styles.content}
        ref={element}
        onLayout={(e) => Object(e.nativeEvent.layout)}
      >
        <Pressable {...{ [toggleAction]: () => setOpen(!open) }}>
          {children}
        </Pressable>
        <SafeAreaView>
          <Animated.View
            pointerEvents={open ? 'auto' : 'none'}
            style={[
              styles.tooltip,
              variant !== 'zoom' && {
                opacity: animation,
              },
              variant === 'grow' && growTransition,
              variant === 'zoom' && zoomTransition,
            ]}
          >
            {withPointer ? (
              <Triangle
                isDown={ScreenHeight / 2 < containerDimentions.py}
                style={[
                  {
                    position: 'absolute',
                    borderBottomColor: pointerColor || backgroundColor,
                    top:
                      ScreenHeight / 2 < containerDimentions.py
                        ? -containerDimentions.height - 24
                        : -12,
                    left: containerDimentions.width / 2,
                  },
                ]}
              />
            ) : null}
            <View
              style={[
                styles.tooltipView,
                {
                  backgroundColor,
                  [I18nManager.isRTL ? 'right' : 'left']:
                    containerDimentions.width + containerDimentions.px >
                    ScreenWidth / 2
                      ? -100
                      : 10,
                  top:
                    ScreenHeight / 2 < containerDimentions.py
                      ? -(tooltipDimention.height || 0) - 40
                      : 0,
                },
              ]}
              onLayout={(e) =>
                setTooltipDimention(Object(e.nativeEvent.layout))
              }
            >
              {title ? <Text style={styles.label}>{title}</Text> : popover}
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    top: 10,
    left: -10,
  },
  content: {
    position: 'relative',
  },
  label: {
    color: '#fff',
  },
  tooltipView: {
    elevation: 24,
    zIndex: 10,
    padding: 10,
    maxWidth: 200,
    width: ScreenWidth / 2,
    borderRadius: 5,
  },
});

export { ToolTip2 };

export default withTheme(ToolTip2, 'ToolTip2');
