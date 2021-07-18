import React, { Component } from 'react';
import {
  Pressable,
  LayoutAnimation,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInput,
} from 'react-native';
import Input, { InputProps } from '../Input';
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

export type SearchBarIosProps = InputProps &
  SearchBarBaseProps &
  typeof SearchBarIOS.defaultProps & {
    cancelButtonProps?: Partial<PressableProps> & {
      buttonStyle?: StyleProp<ViewStyle>;
      buttonTextStyle?: StyleProp<TextStyle>;
      color?: string;
      buttonDisabledStyle?: StyleProp<ViewStyle>;
      buttonDisabledTextStyle?: StyleProp<ViewStyle>;
    };
    cancelButtonTitle?: string;
    showCancel?: boolean;
  };

type SearchBarState = {
  hasFocus: boolean;
  isEmpty: boolean;
  cancelButtonWidth: number | null;
};

export class SearchBarIOS extends Component<
  SearchBarIosProps & Partial<ThemeProps<SearchBarIosProps>>,
  SearchBarState
> {
  input!: TextInput;
  static defaultProps = {
    value: '',
    cancelButtonTitle: 'Cancel',
    loadingProps: {},
    cancelButtonProps: {},
    showLoading: false,
    onClear: () => null,
    onCancel: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onChangeText: () => null,
    searchIcon: { name: 'ios-search' },
    clearIcon: { name: 'ios-close-circle' },
    showCancel: false,
  };

  constructor(props: SearchBarIosProps) {
    super(props);
    const { value } = props;
    this.state = {
      hasFocus: false,
      isEmpty: value ? value === '' : true,
      cancelButtonWidth: null,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.onChangeText('');
    if (this.props.showCancel) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ hasFocus: false });
    }
    setTimeout(() => {
      this.blur();
      this.props.onCancel();
    }, 0);
  };

  onFocus: InputProps['onFocus'] = (event) => {
    this.props.onFocus(event);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      hasFocus: true,
      isEmpty: this.props.value === '',
    });
  };

  onBlur: InputProps['onBlur'] = (event) => {
    this.props.onBlur(event);
    if (!this.props.showCancel) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        hasFocus: false,
      });
    }
  };

  onChangeText = (text: string) => {
    this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  render() {
    const {
      theme,
      cancelButtonProps,
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      placeholderTextColor,
      showLoading,
      loadingProps,
      searchIcon,
      showCancel,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
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
        style={StyleSheet.flatten([
          styles.container,
          { backgroundColor: theme?.colors?.white },
          containerStyle,
        ])}
      >
        <Input
          testID="searchInput"
          renderErrorMessage={false}
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={(input: TextInput) => {
            this.input = input;
          }}
          inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
          containerStyle={{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={StyleSheet.flatten([
            styles.inputContainer,
            { backgroundColor: theme?.colors?.platform?.ios?.searchBg },
            hasFocus && {
              marginRight: this.state.cancelButtonWidth
                ? this.state.cancelButtonWidth
                : 0,
            },
            inputContainerStyle,
          ])}
          leftIcon={renderNode(Icon, searchIcon, defaultSearchIcon(theme))}
          leftIconContainerStyle={StyleSheet.flatten([
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ])}
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
                  onPress: this.clear,
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
              opacity: this.state.cancelButtonWidth === null ? 0 : 1,
              right: hasFocus
                ? 0
                : this.state.cancelButtonWidth && -this.state.cancelButtonWidth,
            },
          ])}
          onLayout={(event) =>
            this.setState({ cancelButtonWidth: event.nativeEvent.layout.width })
          }
        >
          <Pressable
            accessibilityRole="button"
            onPress={this.cancel}
            disabled={buttonDisabled}
            {...otherCancelButtonProps}
          >
            <View style={[buttonStyle, buttonDisabled && buttonDisabledStyle]}>
              <Text
                style={[
                  styles.buttonTextStyle,
                  buttonColor && { color: buttonColor },
                  buttonTextStyle,
                  buttonDisabled &&
                    (buttonDisabledTextStyle || styles.buttonTextDisabled),
                ]}
              >
                {cancelButtonTitle}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

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
