---
id: slider

title: Slider

slug: /slider
---

import Usage from './usage/Slider/Slider.md'

Sliders allow users to select a value from a fixed set of values using drag utility.

## Usage

<Usage />

---

## Props

- [allowTouchTrack](#allowTouchTrack)
- [animateTransitions](#animateTransitions)
- [animationConfig](#animationConfig)
- [animationType](#animationType)
- [containerStyle](#containerStyle)
- [debugTouchArea](#debugTouchArea)
- [disabled](#disabled)
- [maximumTrackTintColor](#maximumTrackTintColor)
- [maximumValue](#maximumValue)
- [minimumTrackTintColor](#minimumTrackTintColor)
- [minimumValue](#minimumValue)
- [onSlidingComplete](#onSlidingComplete)
- [onSlidingStart](#onSlidingStart)
- [onValueChange](#onValueChange)
- [orientation](#orientation)
- [step](#step)
- [style](#style)
- [thumbProps](#thumbProps)
- [thumbStyle](#thumbStyle)
- [thumbTintColor](#thumbTintColor)
- [thumbTouchSize](#thumbTouchSize)
- [trackStyle](#trackStyle)
- [value](#value)

## Reference

### allowTouchTrack

If true, thumb will respond and jump to any touch along the track.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### animateTransitions

Set to true if you want to use the default 'spring' animation.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### animationConfig

Used to configure the animation parameters. These are the same parameters in the [Animated library](https://reactnative.dev/docs/animations.html).

| Type                                           | Default |
| ---------------------------------------------- | ------- |
| TimingAnimationConfig \| SpringAnimationConfig | None    |

---

### animationType

Set to 'spring' or 'timing' to use one of those two types of animations with the default [animation properties](https://reactnative.dev/docs/animations.html).

| Type                 | Default |
| -------------------- | ------- |
| "spring" \| "timing" | timing  |

---

### containerStyle

Apply style to the container of the slider.

| Type                                                                                                                                                                                                                                                                                                    | Default |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| { containerHorizontal: { height: number; justifyContent: "center"; }; containerVertical: { width: number; flexDirection: "column"; alignItems: "center"; }; track: { borderRadius: number; }; trackHorizontal: { ...; }; trackVertical: { ...; }; touchArea: { ...; }; debugThumbTouchArea: { ...; }; } | None    |

---

### debugTouchArea

Set this to true to visually see the thumb touch rect in green.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### disabled

If true the user won't be able to move the slider.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### maximumTrackTintColor

The color used for the track to the right of the button.

| Type   | Default |
| ------ | ------- |
| string | #b3b3b3 |

---

### maximumValue

Initial maximum value of the slider.

| Type   | Default |
| ------ | ------- |
| number | 1       |

---

### minimumTrackTintColor

The color used for the track to the left of the button.

| Type   | Default |
| ------ | ------- |
| string | #3f3f3f |

---

### minimumValue

Initial minimum value of the slider.

| Type   | Default |
| ------ | ------- |
| number | 0       |

---

### onSlidingComplete

Callback called when the user finishes changing the value (e.g. when the slider is released).

| Type                    | Default |
| ----------------------- | ------- |
| (value: number) => void | None    |

---

### onSlidingStart

Callback called when the user starts changing the value (e.g. when the slider is pressed).

| Type                    | Default |
| ----------------------- | ------- |
| (value: number) => void | None    |

---

### onValueChange

Callback continuously called while the user is dragging the slider.

| Type                    | Default |
| ----------------------- | ------- |
| (value: number) => void | None    |

---

### orientation

Set the orientation of the slider.

| Type                       | Default    |
| -------------------------- | ---------- |
| "vertical" \| "horizontal" | horizontal |

---

### step

Step value of the slider. The value should be between 0 and maximumValue - minimumValue).

| Type   | Default |
| ------ | ------- |
| number | 0       |

---

### style

The style applied to the slider container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### thumbProps

The props applied to the thumb. Uses `Component` prop which can accept `Animated` components.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### thumbStyle

The style applied to the thumb.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### thumbTintColor

The color used for the thumb.

| Type   | Default |
| ------ | ------- |
| string | red     |

---

### thumbTouchSize

The size of the touch area that allows moving the thumb. The touch area has the same center as the visible thumb. This allows to have a visually small thumb while still allowing the user to move it easily.

| Type    | Default                                   |
| ------- | ----------------------------------------- |
| Sizable | { width: THUMB_SIZE, height: THUMB_SIZE } |

---

### trackStyle

The style applied to the track.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### value

Initial value of the slider.

| Type   | Default |
| ------ | ------- |
| number | 0       |

---
