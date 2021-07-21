---
id: pricingcard

title: PricingCard

slug: /pricingcard
---

import Usage from './usage/PricingCard/PricingCard.md'

Pricing is a convenience component used to display features and pricing tables in a beautiful and engaging way.

## Usage

<Usage />

---

## Props

- [button](#button)
- [color](#color)
- [containerStyle](#containerStyle)
- [info](#info)
- [infoStyle](#infoStyle)
- [onButtonPress](#onButtonPress)
- [price](#price)
- [pricingStyle](#pricingStyle)
- [title](#title)
- [titleStyle](#titleStyle)
- [wrapperStyle](#wrapperStyle)

## Reference

### button

Button information.

| Type                             | Default |
| -------------------------------- | ------- |
| ButtonProps \| ButtonInformation | None    |

---

### color

Color scheme for button & title.

| Type   | Default                |
| ------ | ---------------------- |
| string | theme?.colors?.primary |

---

### containerStyle

Outer component styling.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### info

Pricing information.

| Type     | Default |
| -------- | ------- |
| string[] | []      |

---

### infoStyle

Specify pricing information style.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### onButtonPress

Function to be run when button is pressed.

| Type       | Default |
| ---------- | ------- |
| () => void | None    |

---

### price

Price mentioned in the pricing card.

| Type             | Default |
| ---------------- | ------- |
| string \| number | None    |

---

### pricingStyle

Specify pricing text style.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### title

Add title in the pricing card.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### titleStyle

Specify title text style.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### wrapperStyle

Inner wrapper component styling.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---
