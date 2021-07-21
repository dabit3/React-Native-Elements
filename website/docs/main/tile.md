---
id: tile

title: Tile

slug: /tile
---

import Usage from './usage/Tile/Tile.md'

Tiles like Cards, are a convenient way to display related content about a single subject.

Also receives all [TouchableNativeFeedback](http://reactnative.dev/docs/touchablenativefeedback.html#props) (Android) or [TouchableOpacity](http://reactnative.dev/docs/touchableopacity.html#props) (iOS) props.

## Usage

<Usage />

---

## Props

- [ImageComponent](#ImageComponent)
- [activeOpacity](#activeOpacity)
- [caption](#caption)
- [captionStyle](#captionStyle)
- [containerStyle](#containerStyle)
- [contentContainerStyle](#contentContainerStyle)
- [featured](#featured)
- [height](#height)
- [icon](#icon)
- [iconContainerStyle](#iconContainerStyle)
- [imageContainerStyle](#imageContainerStyle)
- [imageProps](#imageProps)
- [imageSrc](#imageSrc)
- [overlayContainerStyle](#overlayContainerStyle)
- [title](#title)
- [titleNumberOfLines](#titleNumberOfLines)
- [titleStyle](#titleStyle)
- [width](#width)

## Reference

### ImageComponent

Custom ImageComponent for Tile.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### activeOpacity

Determines what the opacity of the wrapped view should be when touch is active.

Defaults to 0.2

Number passed to control opacity on press.

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### caption

Text inside the tilt when tile is featured.

| Type | Default |
| ---- | ------- |
| any  | None    |

---

### captionStyle

Styling for the caption (optional); You only use this if `caption` is a string.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### containerStyle

Styling for the outer tile container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### contentContainerStyle

Styling for bottom container when not featured tile.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### featured

Changes the look of the tile.

| Type    | Default |
| ------- | ------- |
| boolean | None    |

---

### height

Height for the tile.

| Type   | Default      |
| ------ | ------------ |
| number | width \* 0.8 |

---

### icon

Icon Component Props.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### iconContainerStyle

Styling for the outer icon container.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### imageContainerStyle

Styling for the image.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### imageProps

Optional properties to pass to the image if provided e.g "resizeMode".

| Type               | Default |
| ------------------ | ------- |
| ImageProps(Object) | {}      |

---

### imageSrc

Source for the image.

| Type                          | Default |
| ----------------------------- | ------- |
| string \| ImageSourcePropType | None    |

---

### overlayContainerStyle

Styling for the overlay container when using featured tile.

| Type               | Default |
| ------------------ | ------- |
| View style(Object) | None    |

---

### title

Text inside the tile.

| Type   | Default |
| ------ | ------- |
| string | None    |

---

### titleNumberOfLines

Number of lines for Title.

| Type   | Default |
| ------ | ------- |
| number | None    |

---

### titleStyle

Styling for the title.

| Type               | Default |
| ------------------ | ------- |
| Text Style(Object) | None    |

---

### width

Width for the tile.

| Type   | Default                        |
| ------ | ------------------------------ |
| number | Dimensions.get('window').width |

---
