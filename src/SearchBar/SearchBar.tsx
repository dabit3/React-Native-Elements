import React from 'react';
import { SearchBarIOS, SearchBarIosProps } from './SearchBar-ios';
import { SearchBarAndroid, SearchBarAndroidProps } from './SearchBar-android';
import { SearchBarDefault, SearchBarDefaultProps } from './SearchBar-default';
import {
  ActivityIndicatorProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInput,
} from 'react-native';
import { IconNode } from '../Icon';
import { ThemeProps } from '../config';

const SearchBar_Components = {
  ios: SearchBarIOS,
  android: SearchBarAndroid,
  default: SearchBarDefault,
};

export type SearchBarBaseProps = React.ComponentPropsWithRef<
  typeof TextInput
> & {
  platform?: 'default' | 'ios' | 'android';
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  clearIcon?: IconNode;
  searchIcon?: IconNode;
  inputStyle?: StyleProp<TextStyle>;
  loadingProps?: ActivityIndicatorProps;
  showLoading?: boolean;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  onClear?(): void;
  onFocus?(): void;
  onBlur?(): void;
  onChangeText?(text: string): void;
  onCancel?(): void;
};

export type SearchBarProps =
  | SearchBarDefaultProps
  | SearchBarAndroidProps
  | SearchBarIosProps;

export const SearchBar = React.forwardRef<
  TextInput,
  SearchBarProps & Partial<ThemeProps<SearchBarProps>>
>(({ platform, ...props }, ref) => {
  const Component = SearchBar_Components[platform] || SearchBarDefault;

  return <Component ref={ref} {...props} />;
});
