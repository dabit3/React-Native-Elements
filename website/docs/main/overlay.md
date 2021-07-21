---
id: overlay

title: Overlay

slug: /overlay
---

import Usage from './usage/Overlay/Overlay.md'

The Overlay is a view that floats above an app’s content.

Overlays are an easy way to inform or request information from the user.

## Usage

<Usage />

---

## Props

- [ModalComponent](#ModalComponent)
- [backdropStyle](#backdropStyle)
- [fullScreen](#fullScreen)
- [isVisible](#isVisible)
- [onBackdropPress](#onBackdropPress)
- [overlayStyle](#overlayStyle)

## Reference

### ModalComponent

Override React Native `Modal` component (usable for web-platform).

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### backdropStyle

Style of the backdrop container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### fullScreen

If set to true, the modal will take up the entire screen width and height.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### isVisible

If true, the overlay is visible.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### onBackdropPress

Handler for backdrop press (only works when `fullscreen` is false).

| Type       | Default    |
| ---------- | ---------- |
| () => void | () => null |

---

### overlayStyle

Style of the actual overlay.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---
