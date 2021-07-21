---
id: avatar

title: Avatar

slug: /avatar
---

import Usage from './usage/Avatar/Avatar.md'

Avatars are found all over ui design from lists to profile screens.

They are commonly used to represent a user and can contain photos, icons, or even text.

## Components

- **Avatar.Accessory** - This is used for adding an accessory to the Avatar. Receives either all [Icon](icon.md#props) or [Image](image.md#props) props.

## Usage

<Usage />

## Props

### Avatar

- [Component](#Component)

- [ImageComponent](#ImageComponent)

- [activeOpacity](#activeOpacity)

- [avatarStyle](#avatarStyle)

- [containerStyle](#containerStyle)

- [icon](#icon)

- [iconStyle](#iconStyle)

- [imageProps](#imageProps)

- [onLongPress](#onLongPress)

- [onPress](#onPress)

- [overlayContainerStyle](#overlayContainerStyle)

- [placeholderStyle](#placeholderStyle)

- [renderPlaceholderContent](#renderPlaceholderContent)

- [rounded](#rounded)

- [size](#size)

- [source](#source)

- [title](#title)

- [titleStyle](#titleStyle)

### Avatar.Accessory

- [style](#style)

- [underlayColor](#underlayColor)

## Reference

### Avatar

#### Component

Component for enclosing element (eg: TouchableHighlight, View, etc).

| Type | Default                                          |
| ---- | ------------------------------------------------ |
| any  | onPress \| onLongPress ? TouchableOpacity : View |

---

#### ImageComponent

Custom ImageComponent for Avatar.

| Type | Default |
| ---- | ------- |
| any  |         |

---

#### activeOpacity

Opacity when pressed.

| Type   | Default |
| ------ | ------- |
| number |         |

---

#### avatarStyle

Style for avatar image.

| Type       | Default |
| ---------- | ------- |
| ImageStyle |         |

---

#### containerStyle

Styling for outer container.

| Type                   | Default |
| ---------------------- | ------- |
| `StyleProp<ViewStyle>` |         |

---

#### icon

Displays an icon as the main content of the Avatar. **Cannot be used alongside title**. When used with the `source` prop it will be used as the placeholder.

| Type       | Default |
| ---------- | ------- |
| AvatarIcon |         |

---

#### iconStyle

Extra styling for icon component.

| Type                   | Default |
| ---------------------- | ------- |
| `StyleProp<TextStyle>` |         |

---

#### imageProps

Optional properties to pass to the avatar e.g "resizeMode".

| Type                  | Default |
| --------------------- | ------- |
| `Partial<ImageProps>` |         |

---

#### onLongPress

Callback function when long pressing component.

| Type       | Default |
| ---------- | ------- |
| () => void |         |

---

#### onPress

Callback function when pressing component.

| Type       | Default |
| ---------- | ------- |
| () => void |         |

---

#### overlayContainerStyle

Style for the view outside image or icon.

| Type                   | Default |
| ---------------------- | ------- |
| `StyleProp<TextStyle>` |         |

---

#### placeholderStyle

Adds style to the placeholder wrapper.

| Type                   | Default |
| ---------------------- | ------- |
| `StyleProp<ViewStyle>` |         |

---

#### renderPlaceholderContent

Custom placeholder element (by default, it's the title).

| Type | Default |
| ---- | ------- |
| any  |         |

---

#### rounded

Makes the avatar circular.

| Type    | Default |
| ------- | ------- |
| boolean |         |

---

#### size

Size of the avatar.

| Type              | Default  |
| ----------------- | -------- |
| number \| "small" | "medium" | "large" | "xlarge" | small |

---

#### source

Image source to be displayed on avatar.

| Type                | Default |
| ------------------- | ------- |
| ImageSourcePropType |         |

---

#### title

Renders title in the placeholder.

| Type   | Default |
| ------ | ------- |
| string |         |

---

#### titleStyle

Style for the title.

| Type                   | Default |
| ---------------------- | ------- |
| `StyleProp<TextStyle>` |         |

---

### Avatar.Accessory

#### style

Style prop inherited from TextProps and TouchableWithoutFeedbackProperties

Only exist here so we can have ViewStyle or TextStyle

Style

Add custom styling to the accessory of avatar.

| Type                                                                      | Default |
| ------------------------------------------------------------------------- | ------- |
| `(ViewStyle \| TextStyle) & StyleProp<ImageStyle> & StyleProp<ViewStyle>` |         |

---

#### underlayColor

The color of the underlay that will show through when the touch is active.

Add underlay color to the accessory of avatar.

| Type       | Default |
| ---------- | ------- |
| ColorValue | #000    |

---
