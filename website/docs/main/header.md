---
id: header

title: Header

slug: /header
---

import Usage from './usage/Header/Header.md'

Headers are navigation components that display information and actions relating to the current screen.

**Note:**

Make sure that you have completed [Step 3](getting_started.md#step-3-setup-react-native-safe-area-context) in the setup guide before using `Header`.

## Usage

<Usage />

---

## Props

- [ViewComponent](#ViewComponent)
- [backgroundColor](#backgroundColor)
- [backgroundImage](#backgroundImage)
- [backgroundImageStyle](#backgroundImageStyle)
- [barStyle](#barStyle)
- [centerComponent](#centerComponent)
- [centerContainerStyle](#centerContainerStyle)
- [children](#children)
- [containerStyle](#containerStyle)
- [elevated](#elevated)
- [leftComponent](#leftComponent)
- [leftContainerStyle](#leftContainerStyle)
- [linearGradientProps](#linearGradientProps)
- [placement](#placement)
- [rightComponent](#rightComponent)
- [rightContainerStyle](#rightContainerStyle)
- [statusBarProps](#statusBarProps)

## Reference

### ViewComponent

Component for container.

| Type | Default                |
| ---- | ---------------------- |
| any  | linearGradientProps \| | !backgroundImage |

    ? View
    : ImageBackground |

---

### backgroundColor

Sets backgroundColor of the parent component.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### backgroundImage

Sets backgroundImage for parent component.

| Type                | Default |
| ------------------- | ------- |
| ImageSourcePropType | None    |

---

### backgroundImageStyle

Styling for backgroundImage in the main container.

| Type       | Default |
| ---------- | ------- |
| ImageStyle | None    |

---

### barStyle

Sets the color of the status bar text.

| Type           | Default |
| -------------- | ------- |
| StatusBarStyle | None    |

---

### centerComponent

Define your center component here.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### centerContainerStyle

Styling for container around the centerComponent.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### children

Add children component to the header.

| Type                  | Default |
| --------------------- | ------- |
| Element[] & ReactNode | []      |

---

### containerStyle

Styling around the main container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### elevated

Elevation for header

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### leftComponent

Define your left component here.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### leftContainerStyle

Styling for container around the leftComponent.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### linearGradientProps

Displays a linear gradient. See [usage](#lineargradient-usage).

| Type   | Default |
| ------ | ------- |
| Object | None    |

---

### placement

Alignment for title.

| Type              | Default  |
| ----------------- | -------- |
| "left" \| "right" | "center" | center |

---

### rightComponent

Define your right component here.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### rightContainerStyle

Styling for container around the rightComponent.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### statusBarProps

Accepts all props for StatusBar.

| Type           | Default |
| -------------- | ------- |
| StatusBarProps | None    |

---
