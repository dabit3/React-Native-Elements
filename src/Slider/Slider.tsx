import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Platform,
  ViewStyle,
  StyleProp,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';
import { Rect } from './components/Rect';
import { SliderThumb } from './components/SliderThumb';

const TRACK_SIZE = 4;
const THUMB_SIZE = 40;
const TRACK_STYLE = Platform.select({ web: 0, default: -1 });
const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
    useNativeDriver: true,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
};

const getBoundedValue = (
  value: number,
  maximumValue: number,
  minimumValue: number
) => {
  return Math.max(Math.min(value, maximumValue), minimumValue);
};

type Sizable = {
  width: number;
  height: number;
};

export type SliderProps = {
  /** Initial value of the slider. */
  value?: number;

  /** If true the user won't be able to move the slider. */
  disabled?: boolean;

  /** Initial minimum value of the slider. */
  minimumValue?: number;

  /** Initial maximum value of the slider. */
  maximumValue?: number;

  /** Step value of the slider. The value should be between 0 and maximumValue - minimumValue). */
  step?: number;

  /** The color used for the track to the left of the button. */
  minimumTrackTintColor?: string;

  /** The color used for the track to the right of the button. */
  maximumTrackTintColor?: string;

  /** If true, thumb will respond and jump to any touch along the track. */
  allowTouchTrack?: boolean;

  /** The color used for the thumb. */
  thumbTintColor?: string;

  /** The size of the touch area that allows moving the thumb. The touch area has the same center as the visible thumb. This allows to have a visually small thumb while still allowing the user to move it easily. */
  thumbTouchSize?: Sizable;

  /** Callback continuously called while the user is dragging the slider. */
  onValueChange?(value: number): void;

  /** Callback called when the user starts changing the value (e.g. when the slider is pressed). */
  onSlidingStart?(value: number): void;

  /** Callback called when the user finishes changing the value (e.g. when the slider is released). */
  onSlidingComplete?(value: number): void;

  /** The style applied to the slider container. */
  style?: StyleProp<ViewStyle>;

  /** The style applied to the track. */
  trackStyle?: StyleProp<ViewStyle>;

  /** The style applied to the thumb. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The props applied to the thumb. Uses `Component` prop which can accept `Animated` components. */
  thumbProps?: any;

  /** Set this to true to visually see the thumb touch rect in green. */
  debugTouchArea?: boolean;

  /** Set to true if you want to use the default 'spring' animation. */
  animateTransitions?: boolean;

  /** Set to 'spring' or 'timing' to use one of those two types of animations with the default [animation properties](https://reactnative.dev/docs/animations.html). */
  animationType?: 'spring' | 'timing';

  /** Set the orientation of the slider. */
  orientation?: 'horizontal' | 'vertical';

  /** Used to configure the animation parameters. These are the same parameters in the [Animated library](https://reactnative.dev/docs/animations.html). */
  animationConfig?:
    | Animated.TimingAnimationConfig
    | Animated.SpringAnimationConfig;

  /** Apply style to the container of the slider. */
  containerStyle?: typeof styles;
};

/** Sliders allow users to select a value from a fixed set of values using drag utility.*/
export const Slider: RneFunctionComponent<SliderProps> = ({
  minimumValue,
  maximumValue,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  containerStyle,
  style,
  trackStyle,
  thumbStyle,
  thumbProps,
  debugTouchArea,
  orientation,
  animateTransitions,
  animationType,
  disabled,
  allowTouchTrack,
  step,
  thumbTouchSize,
  ...other
}) => {
  const _previousLeft = useRef(0);
  const [allMeasured, setAllMeasured] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [trackSize, setTrackSize] = useState({ width: 0, height: 0 });
  const [thumbSize, setThumbSize] = useState({ width: 0, height: 0 });
  const containerSizeValue = useRef(containerSize);
  const trackSizeValue = useRef(trackSize);
  const thumbSizeValue = useRef(thumbSize);
  const isVertical = useRef(orientation === 'vertical');
  const props = other;
  const propEvents = {
    onSlidingComplete: props.onSlidingComplete,
    onSlidingStart: props.onSlidingStart,
    onValueChange: props.onValueChange,
  };

  const [value] = useState(
    new Animated.Value(
      getBoundedValue(props.value || 0, maximumValue || 1, minimumValue || 0)
    )
  );

  useEffect(() => {
    containerSizeValue.current = containerSize;
  }, [containerSize]);
  useEffect(() => {
    trackSizeValue.current = trackSize;
  }, [trackSize]);
  useEffect(() => {
    thumbSizeValue.current = thumbSize;
  }, [thumbSize]);

  const measureContainer = (x: LayoutChangeEvent) => {
    handleMeasure('containerSize', x);
  };
  const measureTrack = (x: LayoutChangeEvent) => {
    handleMeasure('trackSize', x);
  };
  const measureThumb = (x: LayoutChangeEvent) => {
    handleMeasure('thumbSize', x);
  };

  const handleMeasure = (name: string, x: LayoutChangeEvent) => {
    const { width: layoutWidth, height: layoutHeight } = x.nativeEvent.layout;
    const width = isVertical.current ? layoutHeight : layoutWidth;
    const height = isVertical.current ? layoutWidth : layoutHeight;
    const size = { width, height };
    if (name === 'containerSize') {
      setContainerSize(size);
    }
    if (name === 'thumbSize') {
      setThumbSize(size);
    }
    if (name === 'trackSize') {
      setTrackSize(size);
    }
    if (thumbSize && trackSize && containerSize) {
      setAllMeasured(true);
    }
  };

  const currentPropValue = useRef(props.value || 0);
  const prevPropValue = useRef(0);

  const didMountRef = useRef(false);

  const setCurrentValue = React.useCallback(
    (value1: number) => {
      value.setValue(value1);
    },
    [value]
  );

  React.useEffect(() => {
    setCurrentValue(props.value || 0);
  }, [props.value, setCurrentValue]);

  useEffect(() => {
    prevPropValue.current = props.value || 0;
    if (didMountRef.current) {
      const newValue = getBoundedValue(
        props.value || 0,
        maximumValue || 1,
        minimumValue || 0
      );
      if (prevPropValue.current !== newValue) {
        if (animateTransitions) {
          setCurrentValueAnimated(new Animated.Value(newValue));
        } else {
          setCurrentValue(newValue);
        }
      }
    } else {
      didMountRef.current = true;
    }
  });

  const setCurrentValueAnimated = (value1: Animated.Value) => {
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType || 'timing'],
      props.animationConfig,
      {
        toValue: value1,
      }
    );
    Animated[animationType || 'timing'](value, animationConfig).start();
  };

  const handleMoveShouldSetPanResponder = () => {
    // Should we become active when the user moves a touch over the thumb?
    if (!TRACK_STYLE) {
      return true;
    }
    return false;
  };

  const handlePanResponderGrant = () => {
    _previousLeft.current = getThumbLeft(currentPropValue.current);
    fireChangeEvent('onSlidingStart');
  };

  const handlePanResponderMove = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    setCurrentValue(getValue(gestureState));
    fireChangeEvent('onValueChange');
  };

  const handlePanResponderRequestEnd = () => {
    // Should we allow another component to take over this pan?
    return false;
  };

  const handlePanResponderEnd = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) {
      return;
    }
    setCurrentValue(getValue(gestureState));
    fireChangeEvent('onSlidingComplete');
  };

  const thumbHitTest = ({ nativeEvent }: GestureResponderEvent) => {
    const thumbTouchRect = getThumbTouchRect();
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX,
      nativeEvent.locationY
    );
  };
  const handleStartShouldSetPanResponder = (
    e: GestureResponderEvent /* gestureState: Object */
  ) => {
    // Should we become active when the user presses down on the thumb?

    if (!allowTouchTrack && !TRACK_STYLE) {
      return thumbHitTest(e);
    }
    if (!trackStyle && allowTouchTrack) {
      setCurrentValue(getOnTouchValue(e));
    }
    fireChangeEvent('onValueChange');
    return true;
  };

  const fireChangeEvent = (event: keyof typeof propEvents) => {
    if (propEvents?.[event]) {
      propEvents?.[event]?.(currentPropValue.current);
    }
  };

  // get value of where some touched on slider.
  const getOnTouchValue = ({ nativeEvent }: GestureResponderEvent) => {
    const location = isVertical.current
      ? nativeEvent.locationY
      : nativeEvent.locationX;
    return getValueForTouch(location);
  };

  const getValueForTouch = (location: number) => {
    const length =
      containerSizeValue.current.width - thumbSizeValue.current.width;
    const ratio = location / length;
    let newValue = ratio * ((maximumValue || 1) - (minimumValue || 0));
    if (step) {
      newValue = Math.round(newValue / step) * step;
    }

    return getBoundedValue(
      newValue + (minimumValue || 0),
      maximumValue || 1,
      minimumValue || 0
    );
  };

  const getTouchOverflowSize = () => {
    const size: { width?: number; height?: number } = {};
    if (allMeasured === true) {
      size.width = Math.max(
        0,
        (thumbTouchSize?.width || THUMB_SIZE) - thumbSizeValue.current.width
      );
      size.height = Math.max(
        0,
        (thumbTouchSize?.height || THUMB_SIZE) -
          containerSizeValue.current.height
      );
    }
    return size;
  };

  const getTouchOverflowStyle = () => {
    const { width, height } = getTouchOverflowSize();
    const touchOverflowStyle: ViewStyle = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }
    if (debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }
    return touchOverflowStyle;
  };

  const getValue = (gestureState: PanResponderGestureState) => {
    const location =
      _previousLeft.current +
      (isVertical.current ? gestureState.dy : gestureState.dx);
    return getValueForTouch(location);
  };

  React.useEffect(() => {
    let listenerID = value.addListener((obj) => {
      currentPropValue.current = obj.value;
    });
    return () => {
      value.removeListener(listenerID);
    };
  });

  const getRatio = (value1: number) => {
    return (
      (value1 - (minimumValue || 0)) /
      ((maximumValue || 1) - (minimumValue || 0))
    );
  };

  const getThumbLeft = (value1: number) => {
    const ratio = getRatio(value1);
    return (
      ratio * (containerSizeValue.current.width - thumbSizeValue.current.width)
    );
  };

  const getThumbTouchRect = () => {
    const touchOverflowSize: any = getTouchOverflowSize();
    const height =
      touchOverflowSize?.height / 2 +
      (containerSizeValue.current.height -
        (thumbTouchSize?.height || THUMB_SIZE)) /
        2;
    const width =
      touchOverflowSize.width / 2 +
      getThumbLeft(currentPropValue.current) +
      (thumbSizeValue.current.width - (thumbTouchSize?.width || THUMB_SIZE)) /
        2;
    if (isVertical.current) {
      return new Rect(
        height,
        width,
        thumbTouchSize?.width || THUMB_SIZE,
        thumbTouchSize?.height || THUMB_SIZE
      );
    }
    return new Rect(
      width,
      height,
      thumbTouchSize?.width || THUMB_SIZE,
      thumbTouchSize?.height || THUMB_SIZE
    );
  };

  const renderDebugThumbTouchRect = (
    thumbLeft: Animated.AnimatedInterpolation
  ) => {
    const thumbTouchRect = getThumbTouchRect();
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    };

    return <Animated.View style={positionStyle} pointerEvents="none" />;
  };

  const getMinimumTrackStyles = (thumbStart: Animated.Animated) => {
    const minimumTrackStyle: StyleProp<any> = {
      position: 'absolute',
    };
    if (isVertical.current) {
      minimumTrackStyle.height = Animated.add(
        thumbStart,
        thumbSizeValue.current.height / 2
      );
      minimumTrackStyle.marginLeft = trackSize.width * TRACK_STYLE;
    } else {
      minimumTrackStyle.width = Animated.add(
        thumbStart,
        thumbSizeValue.current.width / 2
      );
      minimumTrackStyle.marginTop = trackSize.height * TRACK_STYLE;
    }
    return minimumTrackStyle;
  };
  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
      onPanResponderGrant: handlePanResponderGrant,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderEnd,
      onPanResponderTerminationRequest: handlePanResponderRequestEnd,
      onPanResponderTerminate: handlePanResponderEnd,
    })
  ).current;

  const mainStyles = containerStyle || styles;
  const appliedTrackStyle = StyleSheet.flatten([styles.track, trackStyle]);
  const thumbStart = value.interpolate({
    inputRange: [minimumValue || 0, maximumValue || 1],
    outputRange: [0, containerSize.width - thumbSize.width],
  });
  const valueVisibleStyle: { width?: number; height?: number } = {};
  if (!allMeasured) {
    valueVisibleStyle.height = 0;
    valueVisibleStyle.width = 0;
  }
  const minimumTrackStyle = {
    ...getMinimumTrackStyles(thumbStart),
    backgroundColor: minimumTrackTintColor,
    ...valueVisibleStyle,
  };
  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <View
      {...other}
      style={StyleSheet.flatten([
        isVertical.current
          ? mainStyles.containerVertical
          : mainStyles.containerHorizontal,
        style,
      ])}
      onLayout={measureContainer}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min: minimumValue,
        max: maximumValue,
        now: props.value,
      }}
    >
      <View
        style={StyleSheet.flatten([
          mainStyles.track,
          isVertical.current
            ? mainStyles.trackVertical
            : mainStyles.trackHorizontal,
          appliedTrackStyle,
          { backgroundColor: maximumTrackTintColor },
        ])}
        onLayout={measureTrack}
      />

      <Animated.View
        style={StyleSheet.flatten([
          mainStyles.track,
          isVertical.current
            ? mainStyles.trackVertical
            : mainStyles.trackHorizontal,
          appliedTrackStyle,
          minimumTrackStyle,
        ])}
      />
      <SliderThumb
        isVisible={allMeasured}
        onLayout={measureThumb}
        style={thumbStyle}
        color={thumbTintColor}
        start={thumbStart}
        vertical={isVertical.current}
        {...thumbProps}
      />
      <View
        style={StyleSheet.flatten([styles.touchArea, touchOverflowStyle])}
        {...panResponder.panHandlers}
      >
        {debugTouchArea === true && renderDebugThumbTouchRect(thumbStart)}
      </View>
    </View>
  );
};

Slider.defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
  minimumTrackTintColor: '#3f3f3f',
  maximumTrackTintColor: '#b3b3b3',
  allowTouchTrack: false,
  thumbTintColor: 'red',
  thumbTouchSize: { width: THUMB_SIZE, height: THUMB_SIZE },
  debugTouchArea: false,
  animationType: 'timing',
  orientation: 'horizontal',
};

const styles = StyleSheet.create({
  containerHorizontal: {
    height: 40,
    justifyContent: 'center',
  },
  containerVertical: {
    width: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  track: {
    borderRadius: TRACK_SIZE / 2,
  },
  trackHorizontal: {
    height: TRACK_SIZE,
  },
  trackVertical: {
    flex: 1,
    width: TRACK_SIZE,
  },

  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});

Slider.displayName = 'Slider';
