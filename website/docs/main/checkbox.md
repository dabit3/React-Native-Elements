---
id: checkbox

title: CheckBox

slug: /checkbox
---

import Usage from './usage/CheckBox/CheckBox.md'

CheckBoxes allow users to complete tasks that involve making choices such as selecting options, or switching settings - On or Off.

It provides a clear visual of either a true or false choice.

## Usage

<Usage />

---

## Props

- [Component](#Component)
- [center](#center)
- [checked](#checked)
- [checkedColor](#checkedColor)
- [checkedIcon](#checkedIcon)
- [checkedTitle](#checkedTitle)
- [containerStyle](#containerStyle)
- [fontFamily](#fontFamily)
- [iconRight](#iconRight)
- [iconType](#iconType)
- [onIconPress](#onIconPress)
- [onLongIconPress](#onLongIconPress)
- [right](#right)
- [size](#size)
- [textStyle](#textStyle)
- [title](#title)
- [titleProps](#titleProps)
- [uncheckedColor](#uncheckedColor)
- [uncheckedIcon](#uncheckedIcon)
- [wrapperStyle](#wrapperStyle)

## Reference

### Component

Specify React Native component for main button.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### center

Aligns checkbox to center.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### checked

Flag for checking the icon.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### checkedColor

Default checked color.

| Type   | Default                |
| ------ | ---------------------- |
| string | theme?.colors?.primary |

---

### checkedIcon

Default checked icon ([Font Awesome Icon](http://fontawesome.io/icons/)).

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### checkedTitle

Specify a custom checked message.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### containerStyle

Style of main container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### fontFamily

Specify different font family.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### iconRight

Moves icon to right of text.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### iconType

Type of icon set. [Supported sets here](icon#available-icon-sets).

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### onIconPress

onPress function for checkbox.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### onLongIconPress

onLongPress function for checkbox.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### right

Aligns checkbox to right.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### size

Size of the checkbox.

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### textStyle

Style of text.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### title

Title of checkbox.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### titleProps

Additional props for the title Text component.

| Type      | Default |
| --------- | ------- |
| TextProps | {}      |

---

### uncheckedColor

Default unchecked color.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### uncheckedIcon

Default checked icon ([Font Awesome Icon](http://fontawesome.io/icons/))

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### wrapperStyle

Style for the wrapper of checkbox.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---
