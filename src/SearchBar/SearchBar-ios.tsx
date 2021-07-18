import React from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
  TextInputProps,
} from 'react-native';
import Input from '../Input';
import Icon from '../Icon';
import { renderNode } from '../helpers';
import { SearchBarBaseProps } from './SearchBar';
import { Theme } from '../config/theme';
import { ThemeProps } from '../config';

const defaultSearchIcon = (theme: Theme) => ({
  type: 'ionicon',
  size: 20,
  name: 'ios-search',
  color: theme?.colors?.platform?.ios?.grey,
});

const defaultClearIcon = (theme: Theme) => ({
  type: 'ionicon',
  name: 'ios-close-circle',
  size: 20,
  color: theme?.colors?.platform?.ios?.grey,
});

export type SearchBarIosProps = SearchBarBaseProps & {
  cancelButtonProps?: Partial<TouchableOpacityProps> & {
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    color?: string;
    buttonDisabledStyle?: StyleProp<ViewStyle>;
    buttonDisabledTextStyle?: StyleProp<ViewStyle>;
  };
  cancelButtonTitle?: string;
  showCancel?: boolean;
};

export const SearchBarIOS = React.forwardRef<
  TextInput,
  SearchBarIosProps & Partial<ThemeProps<SearchBarIosProps>>
>(
  (
    {
      theme,
      cancelButtonProps = {},
      cancelButtonTitle = 'Cancel',
      containerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      placeholderTextColor,
      showLoading = false,
      loadingProps = {},
      searchIcon = { name: 'ios-search' },
      clearIcon = { name: 'ios-close-circle' },
      showCancel = false,
      onCancel = () => null,
      onClear = () => null,
      onChangeText = () => null,
      onFocus = () => null,
      onBlur = () => null,
      value = '',
      ...props
    },
    ref: React.MutableRefObject<TextInput>
  ) => {
    const root = React.useRef<TextInput>(null);
    const [hasFocus, setHasFocus] = React.useState(false);
    const [isEmpty, setIsEmpty] = React.useState(value ? value === '' : true);
    const [cancelButtonWidth, setCancelButtonWidth] = React.useState<
      number | null
    >(null);

    const onChangeTextHandler = React.useCallback(
      (text: string) => {
        onChangeText(text);
        setIsEmpty(text === '');
      },
      [onChangeText]
    );

    const onClearHandler = React.useCallback(() => {
      root.current.clear();
      onChangeTextHandler('');
      onClear();
    }, [onChangeTextHandler, onClear]);

    const onCancelHandler = React.useCallback(() => {
      onChangeTextHandler('');
      if (showCancel) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHasFocus(false);
      }
      setTimeout(() => {
        root.current.blur();
        onCancel();
      }, 0);
    }, [onCancel, onChangeTextHandler, showCancel]);

    const onFocusHandler = React.useCallback(
      (event) => {
        onFocus(event);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHasFocus(true);
        setIsEmpty(value === '');
      },
      [onFocus, value]
    );

    const onBlurHandler = React.useCallback(
      (event) => {
        onBlur(event);
        if (!showCancel) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setHasFocus(false);
        }
      },
      [onBlur, showCancel]
    );

    React.useImperativeHandle<TextInput, any>(ref, () => ({
      focus: () => root?.current?.focus(),
      clear: () => root?.current?.clear(),
      setNativeProps: (args: TextInputProps) =>
        root.current.setNativeProps(args),
      isFocused: () => root.current.isFocused(),
      blur: () => root.current.blur(),
    }));

    const { style: loadingStyle, ...otherLoadingProps } = loadingProps || {
      style: {},
    };
    const {
      buttonStyle,
      buttonTextStyle,
      color: buttonColor,
      disabled: buttonDisabled,
      buttonDisabledStyle,
      buttonDisabledTextStyle,
      ...otherCancelButtonProps
    } = cancelButtonProps;

    return (
      <View
        testID="RNE__SearchBar-wrapper"
        style={StyleSheet.flatten([
          styles.container,
          { backgroundColor: theme?.colors?.white },
          containerStyle,
        ])}
      >
        <Input
          testID="RNE__SearchBar"
          renderErrorMessage={false}
          {...props}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChangeText={onChangeTextHandler}
          ref={root}
          inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
          containerStyle={{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={StyleSheet.flatten([
            styles.inputContainer,
            { backgroundColor: theme?.colors?.platform?.ios?.searchBg },
            hasFocus && {
              marginRight: cancelButtonWidth || 0,
            },
            inputContainerStyle,
          ])}
          leftIcon={renderNode(Icon, searchIcon, defaultSearchIcon(theme))}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          placeholderTextColor={
            placeholderTextColor || theme?.colors?.platform?.ios?.grey
          }
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  key="loading"
                  style={StyleSheet.flatten([{ marginRight: 5 }, loadingStyle])}
                  {...otherLoadingProps}
                />
              )}
              {!isEmpty &&
                renderNode(Icon, clearIcon, {
                  ...defaultClearIcon(theme),
                  key: 'cancel',
                  onPress: onClearHandler,
                })}
            </View>
          }
          rightIconContainerStyle={StyleSheet.flatten([
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ])}
        />

        <View
          style={StyleSheet.flatten([
            styles.cancelButtonContainer,
            {
              opacity: cancelButtonWidth === null ? 0 : 1,
              right: hasFocus ? 0 : cancelButtonWidth && -cancelButtonWidth,
            },
          ])}
          onLayout={(event) => {
            setCancelButtonWidth(event.nativeEvent.layout.width);
          }}
          testID="RNE__SearchBar-cancelButtonContainer"
        >
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onCancelHandler}
            disabled={buttonDisabled}
            {...otherCancelButtonProps}
          >
            <View
              style={StyleSheet.flatten([
                buttonStyle,
                buttonDisabled && buttonDisabledStyle,
              ])}
              testID="RNE__SearchBar-cancelButton"
            >
              <Text
                style={StyleSheet.flatten([
                  styles.buttonTextStyle,
                  buttonColor && { color: buttonColor },
                  buttonTextStyle,
                  buttonDisabled &&
                    (buttonDisabledTextStyle || styles.buttonTextDisabled),
                ])}
              >
                {cancelButtonTitle}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    marginLeft: 6,
    overflow: 'hidden',
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderRadius: 9,
    minHeight: 36,
    marginLeft: 8,
    marginRight: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
  buttonTextStyle: {
    color: '#007aff',
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
  },
  buttonTextDisabled: {
    color: '#cdcdcd',
  },
  cancelButtonContainer: {
    position: 'absolute',
  },
});
