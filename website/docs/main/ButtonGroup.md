---
id: buttongroup

title: ButtonGroup

slug: /buttongroup
---

import Usage from './usage/ButtonGroup/ButtonGroup.md'

ButtonGroup is a linear set of segments, each of which function as a button that can display a different view/or perform a different action.

Use a ButtonGroup to offer choices that are closely related but mutually exclusive.

This component inherits [all native TouchableHighlight and TouchableOpacity props that come with React Native TouchableHighlight or TouchableOpacity elements](https://reactnative.dev/docs/touchablehighlight.html).

## Usage

<Usage />

---

## Props

- [Component](#Component)
- [activeOpacity](#activeOpacity)
- [button](#button)
- [buttonContainerStyle](#buttonContainerStyle)
- [buttonStyle](#buttonStyle)
- [buttons](#buttons)
- [containerStyle](#containerStyle)
- [disabled](#disabled)
- [disabledSelectedStyle](#disabledSelectedStyle)
- [disabledSelectedTextStyle](#disabledSelectedTextStyle)
- [disabledStyle](#disabledStyle)
- [disabledTextStyle](#disabledTextStyle)
- [innerBorderStyle](#innerBorderStyle)
- [onHideUnderlay](#onHideUnderlay)
- [onPress](#onPress)
- [onShowUnderlay](#onShowUnderlay)
- [selectMultiple](#selectMultiple)
- [selectedButtonStyle](#selectedButtonStyle)
- [selectedIndex](#selectedIndex)
- [selectedIndexes](#selectedIndexes)
- [selectedTextStyle](#selectedTextStyle)
- [setOpacityTo](#setOpacityTo)
- [textStyle](#textStyle)
- [underlayColor](#underlayColor)
- [vertical](#vertical)

## Reference

### Component

Choose other button component such as TouchableOpacity.

| Type | Default                                                          |
| ---- | ---------------------------------------------------------------- |
| any  | { android: TouchableNativeFeedback, default: TouchableOpacity, } |

---

### activeOpacity

Add active opacity to the button in buttongroup.

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### button

Button for the component.

| Type   | Default |
| ------ | ------- |
| object | None    |

---

### buttonContainerStyle

Specify styling for button containers.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### buttonStyle

Specify styling for button.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### buttons

Array of buttons for component (required), if returning a component, must be an object with { element: componentName }.

| Type  | Default |
| ----- | ------- |
| any[] | None    |

---

### containerStyle

Specify styling for main button container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabled

Controls if buttons are disabled. Setting `true` makes all of them disabled, while using an array only makes those indices disabled.

| Type                | Default |
| ------------------- | ------- |
| boolean \| number[] | false   |

---

### disabledSelectedStyle

Styling for each selected button when disabled.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabledSelectedTextStyle

Styling for the text of each selected button when disabled.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### disabledStyle

Styling for each button when disabled.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabledTextStyle

Styling for the text of each button when disabled.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### innerBorderStyle

Update the styling of the interior border of the list of buttons.

| Type                                | Default |
| ----------------------------------- | ------- |
| { color?: string; width?: number; } | None    |

---

### onHideUnderlay

Function called on hiding underlay.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### onPress

Method to update Button Group Index.

| Type                     | Default    |
| ------------------------ | ---------- |
| (...args: any[]) => void | () => null |

---

### onShowUnderlay

Function called on showing underlay.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### selectMultiple

Allows the user to select multiple buttons.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### selectedButtonStyle

Specify styling for selected button.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### selectedIndex

Current selected index of array of buttons.

| Type   | Default |
| ------ | ------- |
| number | null    |

---

### selectedIndexes

Current selected indexes from the array of buttons.

| Type     | Default |
| -------- | ------- |
| number[] | []      |

---

### selectedTextStyle

Specify specific styling for text in the selected state.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### setOpacityTo

Funtion to set the opacity.

| Type                    | Default |
| ----------------------- | ------- |
| (value: number) => void | None    |

---

### textStyle

Specify specific styling for text.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### underlayColor

Specify underlayColor for TouchableHighlight.

| Type   | Default                |
| ------ | ---------------------- |
| string | theme?.colors?.primary |

---

### vertical

Display the ButtonGroup vertically.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---
