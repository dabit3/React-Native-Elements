import React from 'react';
import {
  View,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageURISource,
  ImageStyle,
} from 'react-native';
import { renderNode, RneFunctionComponent } from '../helpers';
import Icon, { IconObject } from '../Icon';
import Image, { ImageProps } from '../Image';

export const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

type AvatarIcon = IconObject & {
  iconStyle?: StyleProp<TextStyle>;
};

export type AvatarProps = {
  /** Component for enclosing element (eg: TouchableHighlight, View, etc). */
  Component?: typeof React.Component;

  /** Callback function when pressing component. */
  onPress?(): void;

  /** Callback function when long pressing component. */
  onLongPress?(): void;

  /** Styling for outer container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Image source to be displayed on avatar. */
  source?: ImageSourcePropType;

  /** Style for avatar image. */
  avatarStyle?: ImageStyle;

  /** Makes the avatar circular. */
  rounded?: boolean;

  /** Renders title in the placeholder. */
  title?: string;

  /** Style for the title. */
  titleStyle?: StyleProp<TextStyle>;

  /** Style for the view outside image or icon. */
  overlayContainerStyle?: StyleProp<TextStyle>;

  /** Opacity when pressed. */
  activeOpacity?: number;

  /** Displays an icon as the main content of the Avatar. **Cannot be used alongside title**. When used with the `source` prop it will be used as the placeholder. */
  icon?: AvatarIcon;

  /** Extra styling for icon component. */
  iconStyle?: StyleProp<TextStyle>;

  /** Size of the avatar. */
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number;

  /** Adds style to the placeholder wrapper. */
  placeholderStyle?: StyleProp<ViewStyle>;

  /** Custom placeholder element (by default, it's the title). */
  renderPlaceholderContent?: React.ReactElement<{}>;

  /** Optional properties to pass to the avatar e.g "resizeMode". */
  imageProps?: Partial<ImageProps>;

  /** Custom ImageComponent for Avatar. */
  ImageComponent?: React.ComponentClass;
};

/** Avatars are found all over ui design from lists to profile screens.
 * They are commonly used to represent a user and can contain photos, icons, or even text. */
export const Avatar: RneFunctionComponent<AvatarProps> = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size = 'small',
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent = RNImage,
  children,
  ...attributes
}) => {
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;

  const height = width;
  const titleSize = width / 2;
  const iconSize = width / 2;

  const PlaceholderContent =
    (renderPlaceholderContent &&
      renderNode(undefined, renderPlaceholderContent)) ||
    (title && (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}
      >
        {title}
      </Text>
    )) ||
    (icon && (
      <Icon
        style={StyleSheet.flatten([iconStyle && iconStyle])}
        color={icon.color || 'white'}
        name={icon.name || 'account'}
        size={icon.size || iconSize}
        type={icon.type || 'material-community'}
      />
    ));

  const hidePlaceholder = !(source && (source as ImageURISource).uri);

  const imageContainerStyle = StyleSheet.flatten([
    styles.overlayContainer,
    rounded && { borderRadius: width / 2, overflow: 'hidden' },
    overlayContainerStyle,
    imageProps && imageProps.containerStyle,
  ]);
  if (imageProps && imageProps.containerStyle) {
    delete imageProps.containerStyle;
  }

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.flatten([
        styles.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...attributes}
    >
      <Image
        testID="RNE__Avatar__Image"
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle,
          hidePlaceholder && styles.hiddenPlaceholderStyle,
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={imageContainerStyle as StyleProp<TextStyle>}
        source={source}
        borderRadius={rounded ? width / 2 : undefined}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  hiddenPlaceholderStyle: {
    backgroundColor: 'transparent',
  },
});

Avatar.displayName = 'Avatar';
