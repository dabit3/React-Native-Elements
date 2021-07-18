import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from 'react-native';
import { PadView } from './components/PadView';
import { RneFunctionComponent } from '../helpers';

export type ListItemBaseProps = PressableProps & {
  /** Additional main container styling. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Specific styling to be used when list item is disabled. */
  disabledStyle?: StyleProp<ViewStyle>;

  /** Add divider at the top of the list item. */
  topDivider?: boolean;

  /** Add divider at the bottom of the list item. */
  bottomDivider?: boolean;

  /** Adds spacing between the leftComponent, the title component & right component. */
  pad?: number;

  /** Replace element with custom element. */
  Component?: typeof React.Component;

  /** Container for linear gradient. */
  ViewComponent?: typeof React.Component;

  /** Props for linear gradient component. */
  linearGradientProps?: any;

  /** Add enclosed children. */
  children?: any;
};

/** ListItems are used to display rows of information, such as a contact list, playlist, or menu.
 * They are very customizable and can contain switches, avatars, badges, icons, and more. */
export const ListItemBase: RneFunctionComponent<ListItemBaseProps> = (
  props
) => {
  const {
    containerStyle,
    onPress,
    onLongPress,
    Component = onPress || onLongPress ? Pressable : View,
    disabled,
    disabledStyle,
    bottomDivider,
    topDivider,
    pad = 16,
    linearGradientProps,
    ViewComponent = View,
    theme,
    children,
    ...attributes
  } = props;

  if (props.linearGradientProps && !props.ViewComponent) {
    console.error(
      "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}"
    );
  }

  return (
    <Component
      {...attributes}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <PadView
        Component={ViewComponent}
        {...linearGradientProps}
        style={StyleSheet.flatten([
          {
            ...Platform.select({
              ios: {
                padding: 14,
              },
              default: {
                padding: 16,
              },
            }),
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme?.colors?.white,
            borderColor: theme?.colors?.divider,
          },
          topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
          bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
          containerStyle,
          disabled && disabledStyle,
        ])}
        pad={pad}
      >
        {children}
      </PadView>
    </Component>
  );
};

ListItemBase.displayName = 'ListItem';
