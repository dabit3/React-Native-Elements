import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Pressable,
  Modal,
  ModalProps,
  ViewStyle,
  StyleProp,
  PressableProps,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';

export type OverlayProps = ModalProps & {
  /** If true, the overlay is visible. */
  isVisible: boolean;

  /** Style of the backdrop container. */
  backdropStyle?: StyleProp<ViewStyle>;

  /** Style of the actual overlay. */
  overlayStyle?: StyleProp<ViewStyle>;

  /** Handler for backdrop press (only works when `fullscreen` is false). */
  onBackdropPress?(): void;

  /** If set to true, the modal will take up the entire screen width and height. */
  fullScreen?: boolean;

  /** Override React Native `Modal` component (usable for web-platform). */
  ModalComponent?: typeof React.Component;

  /** Pressable Props */
  pressableProps?: PressableProps;
};

/** The Overlay is a view that floats above an app’s content.
 * Overlays are an easy way to inform or request information from the user. */
export const Overlay: RneFunctionComponent<OverlayProps> = ({
  children,
  backdropStyle,
  overlayStyle,
  onBackdropPress = () => null,
  fullScreen = false,
  ModalComponent = Modal,
  isVisible,
  pressableProps,
  ...props
}) => (
  <ModalComponent
    visible={isVisible}
    onRequestClose={onBackdropPress}
    transparent
    {...props}
  >
    <Pressable
      style={StyleSheet.flatten([styles.backdrop, backdropStyle])}
      onPress={onBackdropPress}
      testID="RNE__Overlay__backdrop"
      {...pressableProps}
    />

    <View style={styles.container} pointerEvents="box-none">
      <View
        style={StyleSheet.flatten([
          styles.overlay,
          fullScreen && styles.fullscreen,
          overlayStyle,
        ])}
      >
        {children}
      </View>
    </View>
  </ModalComponent>
);

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});

Overlay.displayName = 'Overlay';
