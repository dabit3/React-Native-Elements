---
id: icon

title: Icon

slug: /icon
---

import Usage from './usage/Icon/Icon.md'

Icons are visual indicators usually used to describe action or intent.

They are also used for displaying information.

## Usage

<Usage />

---

## Props

- [Component](#Component)
- [backgroundColor](#backgroundColor)
- [borderRadius](#borderRadius)
- [brand](#brand)
- [color](#color)
- [containerStyle](#containerStyle)
- [disabled](#disabled)
- [disabledStyle](#disabledStyle)
- [iconProps](#iconProps)
- [iconStyle](#iconStyle)
- [name](#name)
- [raised](#raised)
- [reverse](#reverse)
- [reverseColor](#reverseColor)
- [size](#size)
- [solid](#solid)
- [style](#style)
- [type](#type)

## Reference

### Component

Update React Native Component.

| Type | Default                                                            |
| ---- | ------------------------------------------------------------------ |
| any  | { android: TouchableNativeFeedback, default: TouchableHighlight, } |

---

### backgroundColor

Background color of the button

| Type   | Default   |
| ------ | --------- |
| string | '#007AFF' |

---

### borderRadius

Border radius of the button

Set to 0 to disable.

| Type   | Default |
| ------ | ------- |
| number | 5       |

---

### brand

Uses the brands font (FontAwesome5 only).

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### color

Text and icon color

Use iconStyle or nest a Text component if you need different colors.

| Type   | Default |
| ------ | ------- |
| string | 'white' |

---

### containerStyle

Add styling to container holding icon.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabled

If true, disable all interactions for this component.

Disables onPress events. Only works when `onPress` has a handler.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### disabledStyle

Style for the button when disabled. Only works when `onPress` has a handler.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### iconProps

Provide all props from react-native Icon component.

| Type      | Default |
| --------- | ------- |
| IconProps | None    |

---

### iconStyle

Styles applied to the icon only

Good for setting margins or a different color.

| Type      | Default           |
| --------- | ----------------- |
| TextStyle | {marginRight: 10} |

---

### name

Name of the icon to show

See Icon Explorer app

{@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### raised

Adds box shadow to button.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### reverse

Reverses color scheme.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### reverseColor

Specify reverse icon color.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### size

Size of the icon, can also be passed as fontSize in the style object.

| Type   | Default |
| ------ | ------- |
| number | 24      |

---

### solid

Uses the solid font.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### style

Style prop inherited from TextProps and TouchableWithoutFeedbackProperties

Only exist here so we can have ViewStyle or TextStyle

| Type                   | Default |
| ---------------------- | ------- |
| ViewStyle \| TextStyle | None    |

---

### type

Type of icon set. [Supported sets here](#available-icon-sets).

| Type   | Default  |
| ------ | -------- |
| string | material |

---
