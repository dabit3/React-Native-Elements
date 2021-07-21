---
id: speeddial

title: SpeedDial

slug: /speeddial
---

import Usage from './usage/SpeedDial/SpeedDial.md'

When pressed, a floating action button can display three to six related actions in the form of a speed dial.

If more than six actions are needed, something other than a FAB should be used to present them.

Upon press, the FAB remains visible and emits a stack of related actions.

If the FAB is tapped in this state, it should either initiate its default action or close the speed dial actions.

## Usage

<Usage />

---

## Props

- [children](#children)
- [isOpen](#isOpen)
- [onClose](#onClose)
- [onOpen](#onOpen)
- [openIcon](#openIcon)
- [overlayColor](#overlayColor)
- [transitionDuration](#transitionDuration)

## Reference

### children

Add childen elements to the speed dial.

| Type              | Default |
| ----------------- | ------- |
| any[] & ReactNode | None    |

---

### isOpen

Opens the action stack.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### onClose

Callback fired when the component requests to be closed.

| Type       | Default  |
| ---------- | -------- |
| () => void | () => {} |

---

### onOpen

Callback fired when the component requests to be open.

| Type       | Default  |
| ---------- | -------- |
| () => void | () => {} |

---

### openIcon

Icon shown on FAB when action stack is open.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### overlayColor

Add overlay color to the speed dial.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### transitionDuration

The duration for the transition, in milliseconds.

| Type   | Default |
| ------ | ------- |
| number | 150     |

---
