---
id: airbnbrating

title: AirbnbRating

slug: /airbnbrating
---

import Usage from './usage/AirbnbRating/AirbnbRating.md'

Ratings are used to collect measurable feedback from users.

Use Rating over an Input where imagery can increase user interaction.

This component is imported from [react-native-ratings](https://github.com/Monte9/react-native-ratings).

There are two tyoes of rating - TapRating and SwipeRating.

This documentation is for Tap Rating version.

## Usage

<Usage />

---

## Props

- [count](#count)
- [defaultRating](#defaultRating)
- [isDisabled](#isDisabled)
- [onFinishRating](#onFinishRating)
- [reviewColor](#reviewColor)
- [reviewSize](#reviewSize)
- [reviews](#reviews)
- [selectedColor](#selectedColor)
- [showRating](#showRating)
- [size](#size)
- [starContainerStyle](#starContainerStyle)
- [starImage](#starImage)

## Reference

### count

Total number of ratings to display

Default is 5

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### defaultRating

Initial value for the rating

Default is 3

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### isDisabled

Whether the rating can be modiefied by the user

Default is false

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### onFinishRating

Callback method when the user finishes rating. Gives you the final rating value as a whole number

| Type                  | Default |
| --------------------- | ------- |
| (number: any) => void | None    |

---

### reviewColor

Color value for review.

Default is #f1c40f

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### reviewSize

Size value for review.

Default is 40

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### reviews

Labels to show when each value is tapped

e.g. If the first star is tapped, then value in index 0 will be used as the label

Default is ['Terrible', 'Bad', 'Okay', 'Good', 'Great']

| Type     | Default |
| -------- | ------- |
| string[] | None    |

---

### selectedColor

Color value for filled stars.

Default is #004666

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### showRating

Determines if to show the reviews above the rating

Default is true

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### size

Size of rating image

Default is 40

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### starContainerStyle

Style for star container

Default is none

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### starImage

Pass in a custom base image source

| Type   | Default |
| ------ | ------- |
| string | None    |

---
