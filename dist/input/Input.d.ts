import React from 'react';
import { Animated, ViewStyle, StyleProp, TextStyle, TextInputProps } from 'react-native';
import { Theme } from '../config/theme';
export declare type InputProps = TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    disabledInputStyle?: StyleProp<TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    leftIcon?: any;
    leftIconContainerStyle?: StyleProp<ViewStyle>;
    rightIcon?: any;
    rightIconContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: object | any[];
    InputComponent?: typeof React.Component;
    errorProps?: object;
    errorStyle?: object | any[];
    errorMessage?: string;
    label?: React.ReactNode;
    labelStyle?: object | any[];
    labelProps?: object;
    theme?: Theme;
    renderErrorMessage?: boolean;
};
declare class Input extends React.Component<InputProps> {
    input: any;
    shakeAnimationValue: Animated.Value;
    focus(): void;
    blur(): void;
    clear(): void;
    isFocused(): boolean;
    setNativeProps(nativeProps: Partial<TextInputProps>): void;
    shake: () => void;
    render(): JSX.Element;
}
export { Input };
declare const _default: React.FunctionComponent<Pick<InputProps, "style" | "onLayout" | "testID" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "disabled" | "allowFontScaling" | "numberOfLines" | "nativeID" | "maxFontSizeMultiplier" | "selectionColor" | "textBreakStrategy" | "hitSlop" | "onBlur" | "onFocus" | "hasTVPreferredFocus" | "tvParallaxProperties" | "containerStyle" | "pointerEvents" | "removeClippedSubviews" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "label" | "placeholder" | "value" | "onContentSizeChange" | "onScroll" | "scrollEnabled" | "autoCapitalize" | "autoCorrect" | "autoFocus" | "blurOnSubmit" | "caretHidden" | "contextMenuHidden" | "defaultValue" | "editable" | "keyboardType" | "maxLength" | "multiline" | "onChange" | "onChangeText" | "onEndEditing" | "onSelectionChange" | "onSubmitEditing" | "onTextInput" | "onKeyPress" | "placeholderTextColor" | "returnKeyType" | "secureTextEntry" | "selectTextOnFocus" | "selection" | "textAlign" | "inputAccessoryViewID" | "clearButtonMode" | "clearTextOnFocus" | "dataDetectorTypes" | "enablesReturnKeyAutomatically" | "keyboardAppearance" | "passwordRules" | "rejectResponderTermination" | "selectionState" | "spellCheck" | "textContentType" | "autoCompleteType" | "importantForAutofill" | "disableFullscreenUI" | "inlineImageLeft" | "inlineImagePadding" | "returnKeyLabel" | "underlineColorAndroid" | "textAlignVertical" | "showSoftInputOnFocus" | "disabledInputStyle" | "inputContainerStyle" | "leftIcon" | "leftIconContainerStyle" | "rightIcon" | "rightIconContainerStyle" | "inputStyle" | "InputComponent" | "errorProps" | "errorStyle" | "errorMessage" | "labelStyle" | "labelProps" | "renderErrorMessage">> | React.ForwardRefExoticComponent<InputProps>;
export default _default;
