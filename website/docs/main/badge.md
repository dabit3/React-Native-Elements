---
id: badge

title: Badge

slug: /badge
---

import Usage from './usage/Badge/Badge.md'

Badges are small components typically used to communicate a numerical value or indicate the status of an item to the user.

## Usage

<Usage />

---

## Props

- [Component](#Component)
- [badgeStyle](#badgeStyle)
- [containerStyle](#containerStyle)
- [onPress](#onPress)
- [status](#status)
- [textProps](#textProps)
- [textStyle](#textStyle)
- [value](#value)

## Reference

### Component

Custom component to replace the badge outer component.

| Type | Default                           |
| ---- | --------------------------------- |
| any  | onPress ? TouchableOpacity : View |

---

### badgeStyle

Additional styling for badge (background) view component.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### containerStyle

Style for the container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### onPress

Function called when pressed on the badge.

| Type                    | Default |
| ----------------------- | ------- |
| (...args: any[]) => any | None    |

---

### status

Determines color of the indicator.

| Type                   | Default   |
| ---------------------- | --------- |
| "primary" \| "success" | "warning" | "error" | primary |

---

### textProps

Extra props for text component.

| Type      | Default |
| --------- | ------- |
| TextProps | None    |

---

### textStyle

Extra styling for icon component.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### value

Text value to be displayed by badge, defaults to empty.

| Type | Default |
| ---- | ------- |
| any  | None    |

---
