import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  StyleProp,
  TextStyle,
} from 'react-native';
import { BackgroundImage, withTheme } from '../../config';
import { renderNode, RneFunctionComponent } from '../../helpers';
import Text from '../../Text';
import Icon from '../../Icon';
import { TileProps } from '../Tile';

const renderText = (
  content: React.ReactNode,
  defaultProps: any,
  style: StyleProp<TextStyle>
) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

const FeaturedTile: RneFunctionComponent<TileProps> = (props) => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    iconContainerStyle,
    titleStyle,
    captionStyle,
    ImageComponent = BackgroundImage,
    imageProps = {},
    ...attributes
  } = props;
  const {
    width = Dimensions.get('window').width,
    height = width * 0.8,
  } = props;
  const styles = StyleSheet.create({
    container: {
      width,
      height,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height,
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 45,
      paddingBottom: 40,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    text: {
      color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 15,
      textAlign: 'center',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <Pressable
      {...attributes}
      style={StyleSheet.flatten([
        styles.container,
        containerStyle && containerStyle,
      ])}
    >
      <ImageComponent
        resizeMode="cover"
        {...imageProps}
        source={imageSrc}
        style={StyleSheet.flatten([
          styles.imageContainer,
          imageContainerStyle && imageContainerStyle,
        ])}
      >
        <View
          style={StyleSheet.flatten([
            styles.overlayContainer,
            overlayContainerStyle && overlayContainerStyle,
          ])}
        >
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle && iconContainerStyle,
            ])}
          >
            {icon && <Icon {...icon} />}
          </View>
          <Text
            testID="featuredTileTitle"
            h4={!titleStyle || !('fontSize' in titleStyle)}
            style={StyleSheet.flatten([styles.text, titleStyle && titleStyle])}
          >
            {title}
          </Text>
          {renderText(caption, { style: captionStyle }, styles.text)}
        </View>
      </ImageComponent>
    </Pressable>
  );
};

const ThemedFeaturedTile = withTheme(FeaturedTile, 'FeaturedTile');

export { FeaturedTile, ThemedFeaturedTile };
