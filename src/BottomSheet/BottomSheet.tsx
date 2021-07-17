import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  StyleProp,
  ViewStyle,
  ModalProps,
  ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RneFunctionComponent } from '../helpers';

export type BottomSheetProps = {
  /** Style of the bottom sheet's container. Use this to change the color of the underlay. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Additional props handed to the `Modal`. */
  modalProps?: ModalProps;

  /** Style of the backdrop container. */
  backdropStyle?: StyleProp<ViewStyle>;

  /** Handler for backdrop press. */
  onBackdropPress?(): void;

  /** Is the modal component shown. */
  isVisible?: boolean;

  /** Used to add props to Scroll view. */
  scrollViewProps?: ScrollViewProps;
};

/** Overlay Modal that displays content from the bottom of the screen.
 * This opens from the bottom of the screen.
 * **Note:**
 * Make sure that you have completed [Step 3](getting_started.md#step-3-setup-react-native-safe-area-context) in the setup guide before using `BottomSheet`.
 */
export const BottomSheet: RneFunctionComponent<BottomSheetProps> = ({
  containerStyle,
  backdropStyle,
  onBackdropPress = () => null,
  isVisible = false,
  modalProps = {},
  children,
  scrollViewProps = {},
  ...props
}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onBackdropPress}
      transparent={true}
      visible={isVisible}
      {...modalProps}
    >
      <Pressable onPress={onBackdropPress} testID="RNE__Overlay__backdrop">
        <View
          testID="backdrop"
          style={StyleSheet.flatten([styles.backdrop, backdropStyle])}
        />
      </Pressable>

      <SafeAreaView
        style={StyleSheet.flatten([
          styles.safeAreaView,
          containerStyle && containerStyle,
        ])}
        {...props}
      >
        <View>
          <ScrollView {...scrollViewProps}>{children}</ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

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
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column-reverse',
  },
  listContainer: { backgroundColor: 'white' },
});

BottomSheet.displayName = 'BottomSheet';
