import React from 'react';
import {
  Pressable,
  View,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  PressableProps,
} from 'react-native';
import Image, { ImageProps } from '../Image';
import Icon, { IconProps } from '../Icon';
import { RneFunctionComponent } from '../helpers';

export type AccessoryProps = Partial<IconProps> &
  Partial<ImageProps> & {
    /** Add underlay color to the accessory of avatar. */
    underlayColor?: ColorValue;

    /** Add custom styling to the accessory of avatar. */
    style?: StyleProp<ViewStyle>;

    /** Props for Pressable */
    pressableProps?: PressableProps;
  };

/** This is used for adding an accessory to the Avatar.
 * Receives either all [Icon](icon.md#props) or [Image](image.md#props) props. */
export const Accessory: RneFunctionComponent<AccessoryProps> = ({
  size = 10,
  style,
  underlayColor = '#000',
  onPress,
  onLongPress,
  source,
  pressableProps,
  ...props
}: AccessoryProps) => {
  return (
    <Pressable
      android_ripple={
        (onPress || onLongPress) && {
          color: underlayColor,
          borderless: false,
          radius: -5,
        }
      }
      {...pressableProps}
      style={[
        styles.accessory,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View>
        {source ? (
          <Image
            source={source}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
            {...props}
          />
        ) : (
          <Icon
            name="mode-edit"
            type="material"
            color="#fff"
            size={size * 0.8}
            {...props}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accessory: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      },
    }),
  },
});

Accessory.displayName = 'Avatar.Accessory';
