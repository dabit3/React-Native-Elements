import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
  ActivityIndicatorProps,
  TextStyle,
} from 'react-native';
import Color from 'color';
import { renderNode, color, RneFunctionComponent } from '../helpers';
import Icon, { IconNode } from '../Icon';
import { Theme } from '../config/theme';
import { TextProps } from '../Text';

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme<ButtonProps> | undefined
): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : theme?.colors?.primary,
  size: 'small',
});

export type ButtonProps = TouchableOpacityProps &
  TouchableNativeFeedbackProps & {
    /** Add button title. */
    title?: string | React.ReactElement<{}>;

    /** Add additional styling for title component. */
    titleStyle?: StyleProp<TextStyle>;

    /** Add additional props for Text component. */
    titleProps?: TextProps;

    /** Add additional styling for button component. */
    buttonStyle?: StyleProp<ViewStyle>;

    /** Type of button. */
    type?: 'solid' | 'clear' | 'outline';

    /** Prop to display a loading spinner. */
    loading?: boolean;

    /** Add additional styling for loading component. */
    loadingStyle?: StyleProp<ViewStyle>;

    /** Add additional props for ActivityIndicator component. */
    loadingProps?: ActivityIndicatorProps;

    /** Styling for Component container. */
    containerStyle?: StyleProp<ViewStyle>;

    /** Displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component. */
    icon?: IconNode;

    /** Styling for Icon Component container. */
    iconContainerStyle?: StyleProp<ViewStyle>;

    /** Displays Icon to the right of title. Needs to be used along with `icon` prop. */
    iconRight?: boolean;

    /** Displays a linear gradient. See [usage](#lineargradient-usage). */
    linearGradientProps?: object;

    /** Component for user interaction. */
    TouchableComponent?: typeof React.Component;

    /** Component for container. */
    ViewComponent?: typeof React.Component;

    /** Disables user interaction. */
    disabled?: boolean;

    /** Style of the button when disabled. */
    disabledStyle?: StyleProp<ViewStyle>;

    /** Style of the title when disabled. */
    disabledTitleStyle?: StyleProp<TextStyle>;

    /** Add raised button styling (optional). Has no effect if `type="clear"`. */
    raised?: boolean;

    /** Displays Icon to the position mentioned. Needs to be used along with `icon` prop. */
    iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  };

/** Buttons are touchable elements used to interact with the screen and to perform and operation.
 * They may display text, icons, or both. Buttons can be styled with several props to look a specific way.
 * Also receives all [TouchableNativeFeedback](http://reactnative.dev/docs/touchablenativefeedback.html#props) (Android) or [TouchableOpacity](http://reactnative.dev/docs/touchableopacity.html#props) (iOS) props. */
export const Button: RneFunctionComponent<ButtonProps> = ({
  TouchableComponent,
  containerStyle,
  onPress = () => console.log('Please attach a method to this component'),
  buttonStyle,
  type = 'solid',
  loading = false,
  loadingStyle,
  loadingProps: passedLoadingProps,
  title = '',
  titleProps,
  titleStyle: passedTitleStyle,
  icon,
  iconContainerStyle,
  iconRight = false,
  disabled = false,
  disabledStyle,
  disabledTitleStyle,
  raised = false,
  linearGradientProps,
  ViewComponent = View,
  theme,
  iconPosition = 'left',
  ...attributes
}) => {
  useEffect(() => {
    if (linearGradientProps && !ViewComponent) {
      console.error(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}"
      );
    }
  });

  const handleOnPress = useCallback(
    (evt) => {
      if (!loading && !disabled) {
        onPress(evt);
      }
    },
    [loading, onPress, disabled]
  );

  // Refactor to Pressable
  const TouchableComponentInternal =
    TouchableComponent ||
    Platform.select({
      android: linearGradientProps ? TouchableOpacity : TouchableNativeFeedback,
      default: TouchableOpacity,
    });

  const titleStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    {
      color: type === 'solid' ? 'white' : theme?.colors?.primary,
    },
    styles.title,
    passedTitleStyle,
    disabled && {
      color: color(theme?.colors?.disabled).darken(0.3).string(),
    },
    disabled && disabledTitleStyle,
  ]);

  const background =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback.Ripple(
          Color(titleStyle?.color?.toString()).alpha(0.32).rgb().string(),
          true
        )
      : undefined;

  const loadingProps: ActivityIndicatorProps = {
    ...defaultLoadingProps(type, theme),
    ...passedLoadingProps,
  };

  const accessibilityState = {
    disabled: !!disabled,
    busy: !!loading,
  };
  const positionStyle = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: 3 || styles.container.borderRadius,
        },
        containerStyle,
        raised && !disabled && type !== 'clear' && styles.raised,
      ]}
      testID="RNE_BUTTON_WRAPPER"
    >
      <TouchableComponentInternal
        onPress={handleOnPress}
        delayPressIn={0}
        activeOpacity={0.3}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        disabled={disabled}
        background={background}
        {...attributes}
      >
        <ViewComponent
          {...linearGradientProps}
          style={StyleSheet.flatten([
            styles.button,
            styles.buttonOrientation,
            {
              flexDirection:
                positionStyle[iconRight ? 'right' : iconPosition] || 'row',
            },
            {
              backgroundColor:
                type === 'solid' ? theme?.colors?.primary : 'transparent',
              borderColor: theme?.colors?.primary,
              borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
            },
            buttonStyle,
            disabled &&
              type === 'solid' && {
                backgroundColor: theme?.colors?.disabled,
              },
            disabled &&
              type === 'outline' && {
                borderColor: color(theme?.colors?.disabled)
                  .darken(0.3)
                  .string(),
              },
            disabled && disabledStyle,
          ])}
        >
          {loading && (
            <ActivityIndicator
              style={StyleSheet.flatten([styles.loading, loadingStyle])}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
          {!loading &&
            icon &&
            renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })}

          {!loading &&
            !!title &&
            renderNode(Text, title, {
              style: titleStyle,
              ...titleProps,
            })}
        </ViewComponent>
      </TouchableComponentInternal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
  },
  buttonOrientation: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
  },
  container: {
    overflow: 'hidden',
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      default: {
        fontSize: 18,
      },
    }),
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: {
    backgroundColor: '#fff',
    overflow: 'visible',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  loading: {
    marginVertical: 2,
  },
});

Button.displayName = 'Button';
