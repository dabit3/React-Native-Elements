import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Keyboard,
  TextInput,
  TextInputProps,
} from 'react-native';
import { renderNode } from '../helpers';
import Input from '../Input';
import Icon, { IconNode } from '../Icon';
import { SearchBarBaseProps } from './SearchBar';
import { Theme, ThemeProps } from '../config';

const defaultSearchIcon = (theme: Theme) => ({
  type: 'material',
  size: 25,
  color: theme?.colors?.platform?.android?.grey,
  name: 'search',
});

const defaultCancelIcon = (theme: Theme) => ({
  type: 'material',
  size: 25,
  color: theme?.colors?.platform?.android?.grey,
  name: 'arrow-back',
});

const defaultClearIcon = (theme: Theme) => ({
  type: 'material',
  size: 25,
  color: theme?.colors?.platform?.android?.grey,
  name: 'clear',
});

export type SearchBarAndroidProps = SearchBarBaseProps & {
  cancelIcon?: IconNode;
};

export const SearchBarAndroid = React.forwardRef<
  TextInput,
  SearchBarAndroidProps & Partial<ThemeProps<SearchBarAndroidProps>>
>(
  (
    {
      theme,
      clearIcon = { name: 'clear' },
      containerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      searchIcon = { name: 'search' },
      cancelIcon = { name: 'arrow-back' },
      showLoading = false,
      loadingProps = {},
      onClear,
      onFocus,
      onBlur,
      onChangeText,
      onCancel,
      value,
      ...attributes
    },
    ref: React.MutableRefObject<TextInput>
  ) => {
    const root = React.useRef<TextInput>(null);
    const [hasFocus, setHasFocus] = React.useState(false);
    const [isEmpty, setIsEmpty] = React.useState(value ? value === '' : true);

    const onChangeTextHandler = React.useCallback(
      (text: string) => {
        onChangeText(text);
        setIsEmpty(text === '');
      },
      [onChangeText]
    );

    const onClearHandler = React.useCallback(() => {
      root?.current?.clear();
      onChangeTextHandler('');
      onClear?.();
    }, [onChangeTextHandler, onClear]);

    const onCancelHandler = React.useCallback(() => {
      root?.current?.blur();
      onCancel?.();
    }, [onCancel]);

    const onFocusHandler = React.useCallback(
      (event) => {
        onFocus?.(event);
        setIsEmpty(value === '');
        setHasFocus(true);
      },
      [onFocus, value]
    );

    const onBlurHandler = React.useCallback(
      (event) => {
        onBlur?.(event);
        setHasFocus(false);
      },
      [onBlur]
    );

    React.useEffect(() => {
      Keyboard.addListener('keyboardDidHide', onCancelHandler);
      return () => Keyboard.removeListener('keyboardDidHide', onCancelHandler);
    }, [onCancelHandler]);

    React.useImperativeHandle<TextInput, any>(ref, () => ({
      focus: () => root?.current?.focus(),
      clear: () => root?.current?.clear(),
      setNativeProps: (args: TextInputProps) =>
        root.current.setNativeProps(args),
      isFocused: () => root.current.isFocused(),
      blur: () => root.current.blur(),
    }));

    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;

    return (
      <View
        testID="RNE__SearchBar-wrapper"
        style={StyleSheet.flatten([
          {
            backgroundColor: theme?.colors?.white,
            paddingTop: 8,
            paddingBottom: 8,
          },
          containerStyle,
        ])}
      >
        <Input
          testID="RNE__SearchBar"
          renderErrorMessage={false}
          {...attributes}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChangeText={onChangeTextHandler}
          ref={root}
          containerStyle={{ paddingHorizontal: 0 }}
          inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
          inputContainerStyle={StyleSheet.flatten([
            styles.inputContainer,
            inputContainerStyle,
          ])}
          leftIcon={
            hasFocus
              ? renderNode(Icon, cancelIcon, {
                  ...defaultCancelIcon(theme as Theme),
                  onPress: onCancelHandler,
                })
              : renderNode(Icon, searchIcon, defaultSearchIcon(theme as Theme))
          }
          leftIconContainerStyle={StyleSheet.flatten([
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ])}
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
                  ...defaultClearIcon(theme as Theme),
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
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    marginLeft: 24,
    marginRight: 8,
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: '100%',
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
});
