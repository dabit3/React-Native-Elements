import Color from 'color';
import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  Pressable,
  PressableProps,
} from 'react-native';
import { normalizeText, color, RneFunctionComponent } from '../helpers';
import Text from '../Text';

export type ButtonGroupProps = {
  /** Button for the component. */
  button?: object;

  /** Choose other button component such as TouchableOpacity. */
  Component?: typeof React.Component;

  /** Props for Pressable */
  pressableProps?: PressableProps;

  /** Method to update Button Group Index. */
  onPress?(...args: any[]): void;

  /** Array of buttons for component (required), if returning a component, must be an object with { element: componentName }. */
  buttons?: (string | React.ReactElement<{}>)[];

  /** Specify styling for main button container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Specify specific styling for text. */
  textStyle?: StyleProp<TextStyle>;

  /** Specify specific styling for text in the selected state. */
  selectedTextStyle?: StyleProp<TextStyle>;

  /** Specify styling for selected button. */
  selectedButtonStyle?: StyleProp<ViewStyle>;

  /** Specify underlayColor for TouchableHighlight. */
  underlayColor?: string;

  /** Current selected index of array of buttons. */
  selectedIndex?: number | null;

  /** Current selected indexes from the array of buttons. */
  selectedIndexes?: number[];

  /** Add active opacity to the button in buttonGroup. */
  activeOpacity?: number;

  /** Function called on hiding underlay. */
  onHideUnderlay?(): void;

  /** Function called on showing underlay. */
  onShowUnderlay?(): void;

  /** Function to set the opacity. */
  setOpacityTo?: (value: number) => void;

  /** Update the styling of the interior border of the list of buttons. */
  innerBorderStyle?: {
    color?: string;
    width?: number;
  };

  /** Specify styling for button. */
  buttonStyle?: StyleProp<ViewStyle>;

  /** Specify styling for button containers. */
  buttonContainerStyle?: StyleProp<ViewStyle>;

  /** Allows the user to select multiple buttons. */
  selectMultiple?: boolean;

  /** Controls if buttons are disabled. Setting `true` makes all of them disabled, while using an array only makes those indices disabled. */
  disabled?: boolean | number[];

  /** Styling for each button when disabled. */
  disabledStyle?: StyleProp<ViewStyle>;

  /** Styling for the text of each button when disabled. */
  disabledTextStyle?: StyleProp<TextStyle>;

  /** Styling for each selected button when disabled. */
  disabledSelectedStyle?: StyleProp<ViewStyle>;

  /** Styling for the text of each selected button when disabled. */
  disabledSelectedTextStyle?: StyleProp<TextStyle>;

  /** Display the ButtonGroup vertically. */
  vertical?: boolean;
};

/** ButtonGroup is a linear set of segments, each of which function as a button that can display a different view/or perform a different action.
 * Use a ButtonGroup to offer choices that are closely related but mutually exclusive.
 * This component inherits [all native TouchableHighlight and TouchableOpacity props that come with React Native TouchableHighlight or TouchableOpacity elements](https://reactnative.dev/docs/touchablehighlight.html). */
export const ButtonGroup: RneFunctionComponent<ButtonGroupProps> = ({
  Component = Pressable,
  pressableProps,
  buttons,
  onPress = () => null,
  selectedIndex = null,
  selectedIndexes = [],
  selectMultiple = false,
  containerStyle,
  innerBorderStyle,
  buttonStyle,
  buttonContainerStyle,
  textStyle,
  selectedTextStyle,
  selectedButtonStyle,
  activeOpacity,
  onHideUnderlay,
  onShowUnderlay,
  setOpacityTo,
  disabled = false,
  disabledStyle,
  disabledTextStyle,
  disabledSelectedStyle,
  disabledSelectedTextStyle,
  vertical = false,
  theme,
  underlayColor = theme?.colors?.primary,
  ...rest
}) => {
  let innerBorderWidth = 1;
  if (
    innerBorderStyle &&
    Object.prototype.hasOwnProperty.call(innerBorderStyle, 'width')
  ) {
    innerBorderWidth = innerBorderStyle.width as number;
  }
  return (
    <View
      {...rest}
      style={StyleSheet.flatten([
        styles.container,
        vertical && styles.verticalContainer,
        containerStyle && containerStyle,
      ])}
    >
      {buttons?.map((button: any, i: number) => {
        const isSelected = selectedIndex === i || selectedIndexes.includes(i);
        const isDisabled =
          disabled === true ||
          (Array.isArray(disabled) && disabled.includes(i));
        return (
          <View
            key={i}
            style={StyleSheet.flatten([
              styles.button,
              vertical && styles.verticalComponent,
              i !== buttons.length - 1 &&
                (vertical
                  ? {
                      borderBottomWidth: innerBorderWidth,
                      borderBottomColor:
                        (innerBorderStyle && innerBorderStyle.color) ||
                        theme?.colors?.grey4,
                    }
                  : {
                      borderRightWidth: innerBorderWidth,
                      borderRightColor:
                        (innerBorderStyle && innerBorderStyle.color) ||
                        theme?.colors?.grey4,
                    }),
              buttonContainerStyle,
            ])}
          >
            <Component
              testID="buttonGroupItem"
              activeOpacity={activeOpacity}
              setOpacityTo={setOpacityTo}
              onHideUnderlay={onHideUnderlay}
              onShowUnderlay={onShowUnderlay}
              android_ripple={{
                color: Color(underlayColor)
                  .alpha(activeOpacity)
                  .rgb()
                  .toString(),
                borderless: false,
                radius: -5,
              }}
              disabled={isDisabled}
              onPress={() => {
                if (selectMultiple) {
                  if (selectedIndexes.includes(i)) {
                    onPress(selectedIndexes.filter((index) => index !== i));
                  } else {
                    onPress([...selectedIndexes, i]);
                  }
                } else {
                  onPress(i);
                }
              }}
              style={styles.button}
              {...pressableProps}
            >
              <View
                style={StyleSheet.flatten([
                  styles.textContainer,
                  buttonStyle && buttonStyle,
                  isSelected && {
                    backgroundColor: theme?.colors?.primary,
                  },
                  isSelected && selectedButtonStyle && selectedButtonStyle,
                  isDisabled && styles.disabled,
                  isDisabled && disabledStyle,
                  isDisabled &&
                    isSelected && {
                      backgroundColor: theme?.colors?.disabled,
                    },
                  isDisabled && isSelected && disabledSelectedStyle,
                ])}
              >
                {button.element ? (
                  <button.element isSelected={isSelected} />
                ) : (
                  <Text
                    testID="buttonGroupItemText"
                    style={StyleSheet.flatten([
                      {
                        fontSize: normalizeText(13),
                        color: theme?.colors?.grey2,
                        ...Platform.select({
                          android: {},
                          default: {
                            fontWeight: '500',
                          },
                        }),
                      },
                      textStyle && textStyle,
                      isSelected && { color: '#fff' },
                      isSelected && selectedTextStyle,
                      isDisabled && {
                        color: color(theme?.colors?.disabled)
                          .darken(0.3)
                          .toString(),
                      },
                      isDisabled && disabledTextStyle,
                      isDisabled && isSelected && disabledSelectedTextStyle,
                    ])}
                  >
                    {button}
                  </Text>
                )}
              </View>
            </Component>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 40,
  },
  verticalContainer: {
    flexDirection: 'column',
    height: null,
  },
  verticalComponent: {
    height: 40,
  },
  disabled: {
    backgroundColor: 'transparent',
  },
});

ButtonGroup.displayName = 'ButtonGroup';
