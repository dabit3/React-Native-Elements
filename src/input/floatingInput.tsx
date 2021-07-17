import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  TextStyle,
  StyleProp,
  TextInputProps,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';
import { withTheme } from '../config';
export type FloatingInputProps = TextInputProps & {
  label?: string;
  value?: string;
  update?: (attrName: string, updatedValue: string) => any;
  keyboardType?: string;
  labelActiveSize?: number;
  labelInActiveSize?: number;
  labelActiveColor?: string;
  labelInActiveColor?: string;
  textInputStyles?: StyleProp<TextStyle>;
  otherTextInputProps?: {};
};
const FloatingTextInput: RneFunctionComponent<FloatingInputProps> = ({
  keyboardType = 'default',
  labelActiveSize = 14,
  labelInActiveSize = 15,
  labelActiveColor = '#86939E',
  labelInActiveColor = '#5E6977',
  textInputStyles = {},
  ...props
}) => {
  const [isFieldActive, setIsFieldActive] = React.useState(false);
  const { current: position } = React.useRef(
    new Animated.Value(isFieldActive ? 1 : 0)
  );
  const handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleBlur = () => {
    if (isFieldActive && !props.value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  const returnAnimatedlabelStyle = () => {
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? labelActiveSize : labelInActiveSize,
      color: isFieldActive ? labelActiveColor : labelInActiveColor,
    };
  };
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.labelStyles, returnAnimatedlabelStyle()]}>
        {props.label}
      </Animated.Text>
      <TextInput
        style={[styles.textInput, textInputStyles]}
        value={props.value}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        {...props.otherTextInputProps}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#86939E',
    borderWidth: 0.5,
    height: 50,
    marginVertical: 6,
  },
  textInput: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 13,
    color: '#86939E',
  },
  labelStyles: {
    position: 'absolute',
    left: 13,
  },
});
export { FloatingTextInput };
export default withTheme(FloatingTextInput, 'FloatingInput');
