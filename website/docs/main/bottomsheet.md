---
id: bottomsheet

title: BottomSheet

slug: /bottomsheet
---

import Usage from './usage/BottomSheet/BottomSheet.md'

Overlay Modal that displays content from the bottom of the screen.

This opens from the bottom of the screen.

**Note:**

Make sure that you have completed [Step 3](getting_started.md#step-3-setup-react-native-safe-area-context) in the setup guide before using `BottomSheet`.

## Usage

<Usage />

---

## Props

- [containerStyle](#containerStyle)
- [isVisible](#isVisible)
- [modalProps](#modalProps)
- [scrollViewProps](#scrollViewProps)

## Reference

### containerStyle

Style of the bottom sheet's container. Use this to change the color of the underlay.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### isVisible

Is the modal component shown.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### modalProps

Additional props handed to the `Modal`.

| Type       | Default |
| ---------- | ------- |
| ModalProps | {}      |

---

### scrollViewProps

Used to add props to Scroll view.

| Type            | Default |
| --------------- | ------- |
| ScrollViewProps | {}      |

---
