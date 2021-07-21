---
id: button

title: Button

slug: /button
---

import Usage from './usage/Button/Button.md'

Buttons are touchable elements used to interact with the screen and to perform and operation.

They may display text, icons, or both. Buttons can be styled with several props to look a specific way.

Also receives all [TouchableNativeFeedback](http://reactnative.dev/docs/touchablenativefeedback.html#props) (Android) or [TouchableOpacity](http://reactnative.dev/docs/touchableopacity.html#props) (iOS) props.

## Usage

<Usage />

---

## Props

- [TouchableComponent](#TouchableComponent)
- [ViewComponent](#ViewComponent)
- [buttonStyle](#buttonStyle)
- [containerStyle](#containerStyle)
- [disabled](#disabled)
- [disabledStyle](#disabledStyle)
- [disabledTitleStyle](#disabledTitleStyle)
- [icon](#icon)
- [iconContainerStyle](#iconContainerStyle)
- [iconPosition](#iconPosition)
- [iconRight](#iconRight)
- [linearGradientProps](#linearGradientProps)
- [loading](#loading)
- [loadingProps](#loadingProps)
- [loadingStyle](#loadingStyle)
- [raised](#raised)
- [title](#title)
- [titleProps](#titleProps)
- [titleStyle](#titleStyle)
- [type](#type)

## Reference

### TouchableComponent

Component for user interaction.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### ViewComponent

Component for container.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### buttonStyle

Add additional styling for button component.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### containerStyle

Styling for Component container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabled

If true, disable all interactions for this component.

Disables user interaction.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### disabledStyle

Style of the button when disabled.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### disabledTitleStyle

Style of the title when disabled.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### icon

Displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### iconContainerStyle

Styling for Icon Component container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### iconPosition

Displays Icon to the position mentioned. Needs to be used along with `icon` prop.

| Type              | Default |
| ----------------- | ------- |
| "left" \| "right" | "top"   | "bottom" | left |

---

### iconRight

Displays Icon to the right of title. Needs to be used along with `icon` prop.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### linearGradientProps

Displays a linear gradient. See [usage](#lineargradient-usage).

| Type   | Default |
| ------ | ------- |
| object | None    |

---

### loading

Prop to display a loading spinner.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### loadingProps

Add additional props for ActivityIndicator component.

| Type                   | Default |
| ---------------------- | ------- |
| ActivityIndicatorProps | None    |

---

### loadingStyle

Add additional styling for loading component.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### raised

Add raised button styling (optional). Has no effect if `type="clear"`.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### title

Add button title.

| Type | Default |
| ---- | ------- |
| any  |         |

---

### titleProps

Add additional props for Text component.

| Type      | Default |
| --------- | ------- |
| TextProps | None    |

---

### titleStyle

Add additional styling for title component.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### type

Type of button.

| Type               | Default   |
| ------------------ | --------- |
| "solid" \| "clear" | "outline" | solid |

---
