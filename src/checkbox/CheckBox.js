import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Text as NativeText,
} from 'react-native';
import merge from 'lodash.merge'

import TextElement from '../text/Text';
import CheckBoxIcon from './CheckBoxIcon';
import { fonts, ViewPropTypes, ThemeConsumer } from '../config';

const CheckBox = props => {
  const { theme, ...rest } = props

  const {
    component,
    checked,
    iconRight,
    title,
    center,
    right,
    containerStyle,
    textStyle,
    wrapperStyle,
    onPress,
    onLongPress,
    checkedTitle,
    fontFamily,
    checkedColor = theme.colors.primary,
    ...attributes
  } = rest;

  const Component = component;

  return (
    <Component
      {...attributes}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[
        styles.container,
        title && styles.containerHasTitle,
        containerStyle && containerStyle,
      ]}
    >
      <View
        style={[
          styles.wrapper,
          right && { justifyContent: 'flex-end' },
          center && { justifyContent: 'center' },
          wrapperStyle && wrapperStyle,
        ]}
      >
        {!iconRight && <CheckBoxIcon {...props} checkedColor={checkedColor} />}

        {React.isValidElement(title)
          ? title
          : title && (
              <TextElement
                style={[
                  styles.text,
                  { color: theme.colors.grey1 },
                  textStyle && textStyle,
                  fontFamily && { fontFamily },
                ]}
              >
                {checked ? checkedTitle || title : title}
              </TextElement>
            )}

        {iconRight && <CheckBoxIcon {...props} checkedColor={checkedColor}/>}
      </View>
    </Component>
  );
};

CheckBox.defaultProps = {
  checked: false,
  iconRight: false,
  right: false,
  center: false,
  uncheckedColor: '#bfbfbf',
  checkedIcon: 'check-square-o',
  uncheckedIcon: 'square-o',
  size: 24,
  component: TouchableOpacity,
};

CheckBox.propTypes = {
  ...CheckBoxIcon.propTypes,
  component: PropTypes.any,
  iconRight: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  center: PropTypes.bool,
  right: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: NativeText.propTypes.style,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  checkedTitle: PropTypes.string,
  fontFamily: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  containerHasTitle: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        ...fonts.android.bold,
      },
    }),
  },
});

export default props => (
  <ThemeConsumer>
    {({theme}) => <CheckBox {...merge({}, theme.checkbox, props)} theme={theme}/>}
  </ThemeConsumer>
);
