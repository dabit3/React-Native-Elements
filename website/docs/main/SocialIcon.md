---
id: socialicon

title: SocialIcon

slug: /socialicon
---

import Usage from './usage/SocialIcon/SocialIcon.md'

SocialIcons are visual cues to online and social media networks. We offer a varied range of social icons.

## Usage

<Usage />

---

## Props

- [Component](#Component)
- [activityIndicatorStyle](#activityIndicatorStyle)
- [button](#button)
- [disabled](#disabled)
- [fontFamily](#fontFamily)
- [fontStyle](#fontStyle)
- [fontWeight](#fontWeight)
- [iconColor](#iconColor)
- [iconSize](#iconSize)
- [iconStyle](#iconStyle)
- [iconType](#iconType)
- [light](#light)
- [loading](#loading)
- [onLongPress](#onLongPress)
- [onPress](#onPress)
- [raised](#raised)
- [small](#small)
- [style](#style)
- [title](#title)
- [type](#type)
- [underlayColor](#underlayColor)

## Reference

### Component

Type of button.

| Type | Default    |
| ---- | ---------- |
| any  | onPress \| | onLongPress ? TouchableHighlight : View |

---

### activityIndicatorStyle

Style to render when in loading state.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### button

Creates button with a social icon.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### disabled

Disables the button, if true.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### fontFamily

Specify different font family.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### fontStyle

Specify text styling.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### fontWeight

Specify font weight of title if set as a button with a title.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### iconColor

Specify the color of the icon.

| Type   | Default |
| ------ | ------- |
| string | white   |

---

### iconSize

Specify the size of the icon.

| Type   | Default |
| ------ | ------- |
| number | 24      |

---

### iconStyle

Extra styling for icon component.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### iconType

Type of icon set. [Supported sets here](icon#available-icon-sets).

| Type   | Default      |
| ------ | ------------ |
| string | font-awesome |

---

### light

Reverses icon color scheme, setting background to white and icon to primary color.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### loading

Shows loading indicator.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### onLongPress

Function to call when pressed for a long time.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### onPress

Function to call when button/icon is pressed.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### raised

Raised adds a drop shadow, set to false to remove.

| Type    | Default |
| ------- | ------- |
| boolean | true    |

---

### small

Decides the size of the activity indicator.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### style

Adds styling to the button.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### title

Title if made into a button.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### type

Social media type.

| Type            | Default |
| --------------- | ------- |
| SocialMediaType | None    |

---

### underlayColor

Add Underlay color.

| Type   | Default |
| ------ | ------- |
| string | None    |

---
