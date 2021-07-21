import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import fonts from '../config/fonts';
import { RneFunctionComponent } from '../helpers';

const colors = {
  'github-alt': '#000000',
  'google-plus-official': '#dd4b39',
  google: '#dd4b39',
  'reddit-alien': '#fc461e',
  'stack-overflow': '#f27f33',
  angellist: '#1c4082',
  codepen: '#000000',
  envelope: '#000000',
  etsy: '#f2581e',
  facebook: '#4267B2',
  'facebook-messenger': '#0084ff',
  flickr: '#ff0084',
  foursquare: '#0072b1',
  github: '#000000',
  gitlab: '#e14329',
  instagram: '#517fa4',
  linkedin: '#007bb6',
  medium: '#02b875',
  pinterest: '#cb2027',
  quora: '#a82400',
  soundcloud: '#f50',
  steam: '#c6c3c1',
  stumbleupon: '#EB4823',
  tumblr: '#32506d',
  twitch: '#6441A5',
  twitter: '#00aced',
  vimeo: '#aad450',
  vk: '#5181b8',
  wechat: '#7bb32e',
  weibo: '#e6162d',
  whatsapp: '#075e54',
  wordpress: '#21759b',
  youtube: '#bb0000',
  microsoft: '#46A4F2',
};

export type SocialMediaType =
  | 'facebook'
  | 'facebook-messenger'
  | 'whatsapp'
  | 'twitter'
  | 'google-plus-official'
  | 'google'
  | 'pinterest'
  | 'linkedin'
  | 'youtube'
  | 'vimeo'
  | 'tumblr'
  | 'instagram'
  | 'quora'
  | 'flickr'
  | 'foursquare'
  | 'wordpress'
  | 'stumbleupon'
  | 'github'
  | 'github-alt'
  | 'twitch'
  | 'medium'
  | 'soundcloud'
  | 'stack-overflow'
  | 'gitlab'
  | 'angellist'
  | 'codepen'
  | 'weibo'
  | 'vk'
  | 'microsoft';

export type SocialIconProps = {
  /** Type of button. */
  Component?: typeof React.Component;

  /** Social media type. */
  type?: SocialMediaType;

  /** Creates button with a social icon. */
  button?: boolean;

  /** Function to call when button/icon is pressed. */
  onPress?(): void;

  /** Function to call when pressed for a long time. */
  onLongPress?(): void;

  /** Type of icon set. [Supported sets here](icon#available-icon-sets). */
  iconType?: string;

  /** Extra styling for icon component. */
  iconStyle?: StyleProp<ViewStyle>;

  /** Adds styling to the button. */
  style?: StyleProp<ViewStyle>;

  /** Specify the color of the icon. */
  iconColor?: string;

  /** Add Underlay color. */
  underlayColor?: string;

  /** Title if made into a button. */
  title?: string;

  /** Raised adds a drop shadow, set to false to remove. */
  raised?: boolean;

  /** Disables the button, if true. */
  disabled?: boolean;

  /** Shows loading indicator. */
  loading?: boolean;

  /** Style to render when in loading state. */
  activityIndicatorStyle?: StyleProp<ViewStyle>;

  /** Decides the size of the activity indicator. */
  small?: string;

  /** Specify the size of the icon. */
  iconSize?: number;

  /** Reverses icon color scheme, setting background to white and icon to primary color. */
  light?: boolean;

  /** Specify font weight of title if set as a button with a title. */
  fontWeight?: string;

  /** Specify text styling. */
  fontStyle?: StyleProp<TextStyle>;

  /** Specify different font family. */
  fontFamily?: string;
};

/** SocialIcons are visual cues to online and social media networks. We offer a varied range of social icons. */
export const SocialIcon: RneFunctionComponent<SocialIconProps> = ({
  activityIndicatorStyle,
  button = false,
  disabled,
  fontFamily,
  fontStyle,
  fontWeight,
  iconType = 'font-awesome',
  iconColor = 'white',
  iconSize = 24,
  iconStyle,
  light,
  loading,
  onLongPress,
  onPress,
  Component = onPress || onLongPress ? TouchableHighlight : View,
  raised = true,
  small,
  style,
  title,
  type,
  underlayColor,
  ...attributes
}) => {
  const shouldShowExpandedButton = button && title;

  return (
    <Component
      testID="RNE_SocialIcon"
      {...attributes}
      underlayColor={light ? 'white' : underlayColor || (type && colors[type])}
      onLongPress={disabled ? null : onLongPress}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      style={StyleSheet.flatten([
        raised && styles.raised,
        styles.container,
        button && styles.button,
        !button && raised && styles.icon,
        !button &&
          !light &&
          !raised && {
            width: iconSize * 2 + 4,
            height: iconSize * 2 + 4,
            borderRadius: iconSize * 2,
          },
        { backgroundColor: type && colors[type] },
        light && { backgroundColor: 'white' },
        style && style,
      ])}
    >
      <View style={styles.wrapper}>
        {(shouldShowExpandedButton || !loading) && (
          <Icon
            testID="RNE_Icon"
            iconStyle={StyleSheet.flatten([iconStyle && iconStyle])}
            color={light ? type && colors[type] : iconColor}
            name={type as SocialMediaType}
            size={iconSize}
            type={iconType}
          />
        )}
        {shouldShowExpandedButton && (
          <Text
            style={
              StyleSheet.flatten([
                styles.title,
                light && { color: type && colors[type] },
                fontFamily && { fontFamily },
                fontWeight && { fontWeight },
                fontStyle && fontStyle,
              ]) as TextStyle
            }
          >
            {title}
          </Text>
        )}

        {loading && (
          <ActivityIndicator
            testID="RNE_ActivityIndicator"
            animating
            style={StyleSheet.flatten([
              styles.activityIndicatorStyle,
              activityIndicatorStyle,
            ])}
            color={light ? type && colors[type] : iconColor || 'white'}
            size={(small && 'small') || 'large'}
          />
        )}
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 7,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginLeft: 15,
    ...Platform.select({
      android: {
        ...fonts.android.black,
      },
      default: {
        fontWeight: 'bold',
      },
    }),
  },
  icon: {
    height: 52,
    width: 52,
  },
  activityIndicatorStyle: {
    marginHorizontal: 10,
    height: 0,
  },
});

SocialIcon.displayName = 'SocialIcon';
