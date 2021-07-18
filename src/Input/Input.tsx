import React from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextProps,
  TextInputProps,
} from 'react-native';
import { renderNode, patchWebProps } from '../helpers';
import { fonts } from '../config';
import Icon, { IconNode } from '../Icon';
import { ThemeProps } from '../config';

const renderText = (content: any, defaultProps: TextProps, style: any) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export type InputProps = React.ComponentPropsWithRef<typeof TextInput> & {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledInputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  leftIcon?: IconNode;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIcon?: IconNode;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  InputComponent?: React.ComponentType;
  errorProps?: object;
  errorStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  label?: string | React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  labelProps?: object;
  renderErrorMessage?: boolean;
};

export type InputRef = TextInput & {
  shake?: () => void;
};

export const Input = React.forwardRef<
  InputRef,
  InputProps & Partial<ThemeProps<InputProps>>
>(
  (
    {
      containerStyle,
      disabled,
      disabledInputStyle,
      inputContainerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      InputComponent = TextInput,
      inputStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      theme,
      renderErrorMessage = true,
      style,
      ...attributes
    },
    ref
  ) => {
    const root = React.useRef<InputRef>();
    const { current: shakeAnimationValue } = React.useRef(
      new Animated.Value(0)
    );

    const shake = React.useCallback(() => {
      shakeAnimationValue.setValue(0);
      Animated.timing(shakeAnimationValue, {
        duration: 375,
        toValue: 3,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    }, [shakeAnimationValue]);

    React.useImperativeHandle<TextInput, any>(ref, () => ({
      focus: () => root.current?.focus(),
      clear: () => root.current?.clear(),
      setNativeProps: (args: TextInputProps) =>
        root.current.setNativeProps(args),
      isFocused: () => root.current?.isFocused(),
      blur: () => root.current?.blur(),
      shake,
    }));

    const translateX = shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    const hideErrorMessage = !renderErrorMessage && !errorMessage;

    return (
      <View
        testID="RNE__Input__view-wrapper"
        style={StyleSheet.flatten([styles.container, containerStyle])}
      >
        {renderText(
          label,
          { style: labelStyle, ...labelProps },
          {
            fontSize: 16,
            color: theme?.colors?.grey3,
            ...Platform.select({
              android: {
                ...fonts.android.bold,
              },
              default: {
                fontWeight: 'bold',
              },
            }),
          }
        )}

        <Animated.View
          style={StyleSheet.flatten([
            {
              flexDirection: 'row',
              borderBottomWidth: 1,
              alignItems: 'center',
              borderColor: theme?.colors?.grey3,
            },
            inputContainerStyle,
            { transform: [{ translateX }] },
          ])}
        >
          {leftIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                leftIconContainerStyle,
              ])}
            >
              {renderNode(Icon, leftIcon)}
            </View>
          )}

          <InputComponent
            testID="RNE__Input__text-input"
            underlineColorAndroid="transparent"
            editable={!disabled}
            ref={root}
            style={StyleSheet.flatten([
              {
                color: theme?.colors?.black,
                fontSize: 18,
                flex: 1,
                minHeight: 40,
              },
              inputStyle,
              disabled && styles.disabledInput,
              disabled && disabledInputStyle,
              style,
            ])}
            placeholderTextColor={theme?.colors?.grey3}
            {...patchWebProps(attributes)}
          />

          {rightIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                rightIconContainerStyle,
              ])}
            >
              {renderNode(Icon, rightIcon)}
            </View>
          )}
        </Animated.View>

        <Text
          {...errorProps}
          style={StyleSheet.flatten([
            {
              margin: 5,
              fontSize: 12,
              color: theme?.colors?.error,
            },
            errorStyle && errorStyle,
            hideErrorMessage && {
              height: 0,
              margin: 0,
              padding: 0,
            },
          ])}
        >
          {errorMessage}
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  disabledInput: {
    opacity: 0.5,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    marginVertical: 4,
  },
});

Input.displayName = 'Input';
