import path from 'path';

type ChildrenType = {
  name: string;
  path: string;
};

export type ComponentType = {
  name: string;
  path: string;
  childrens: ChildrenType[];
};

export const componentMap = {
  AirbnbRating: {
    name: 'AirbnbRating',
    path: path.join(__dirname, '../../../src/AirbnbRating/AirbnbRating.tsx'),
    childrens: [],
  },
  // Avatar: {
  //   name: 'Avatar',
  //   path: path.join(__dirname, '../../../src/Avatar/Avatar.tsx'),
  //   childrens: [
  //     {
  //       name: 'Accessory',
  //       path: path.join(__dirname, '../../../src/Avatar/Avatar.Accessory.tsx'),
  //     },
  //   ],
  // },
  Badge: {
    name: 'Badge',
    path: path.join(__dirname, '../../../src/Badge/Badge.tsx'),
    childrens: [],
  },
  BottomSheet: {
    name: 'BottomSheet',
    path: path.join(__dirname, '../../../src/BottomSheet/BottomSheet.tsx'),
    childrens: [],
  },
  Button: {
    name: 'Button',
    path: path.join(__dirname, '../../../src/Button/Button.tsx'),
    childrens: [],
  },
  ButtonGroup: {
    name: 'ButtonGroup',
    path: path.join(__dirname, '../../../src/ButtonGroup/ButtonGroup.tsx'),
    childrens: [],
  },
  // Card: {
  //   name: 'Card',
  //   path: path.join(__dirname, '../../../src/Card/Card.tsx'),
  //   childrens: [
  //     {
  //       name: 'Divider',
  //       path: path.join(__dirname, '../../../src/Card/Card.Divider.tsx'),
  //     },
  //     {
  //       name: 'FeaturedSubtitle',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/Card/Card.FeaturedSubtitle.tsx'
  //       ),
  //     },
  //     {
  //       name: 'FeaturedTitle',
  //       path: path.join(__dirname, '../../../src/Card/Card.FeaturedTitle.tsx'),
  //     },
  //     {
  //       name: 'Image',
  //       path: path.join(__dirname, '../../../src/Card/Card.Image.tsx'),
  //     },
  //     {
  //       name: 'Title',
  //       path: path.join(__dirname, '../../../src/Card/Card.Title.tsx'),
  //     },
  //   ],
  // },
  CheckBox: {
    name: 'CheckBox',
    path: path.join(__dirname, '../../../src/Checkbox/CheckBox.tsx'),
    childrens: [],
  },
  Chip: {
    name: 'Chip',
    path: path.join(__dirname, '../../../src/Chip/Chip.tsx'),
    childrens: [],
  },
  // Dialog: {
  //   name: 'Dialog',
  //   path: path.join(__dirname, '../../../src/Dialog/Dialog.tsx'),
  //   childrens: [
  //     {
  //       name: 'Actions',
  //       path: path.join(__dirname, '../../../src/Dialog/Dialog.Actions.tsx'),
  //     },
  //     {
  //       name: 'Button',
  //       path: path.join(__dirname, '../../../src/Dialog/Dialog.Button.tsx'),
  //     },
  //     {
  //       name: 'Loading',
  //       path: path.join(__dirname, '../../../src/Dialog/Dialog.Loading.tsx'),
  //     },
  //     {
  //       name: 'Title',
  //       path: path.join(__dirname, '../../../src/Dialog/Dialog.Title.tsx'),
  //     },
  //   ],
  // },
  Divider: {
    name: 'Divider',
    path: path.join(__dirname, '../../../src/Divider/Divider.tsx'),
    childrens: [],
  },
  FAB: {
    name: 'FAB',
    path: path.join(__dirname, '../../../src/FAB/FAB.tsx'),
    childrens: [],
  },
  Header: {
    name: 'Header',
    path: path.join(__dirname, '../../../src/Header/Header.tsx'),
    childrens: [],
  },
  Icon: {
    name: 'Icon',
    path: path.join(__dirname, '../../../src/Icon/Icon.tsx'),
    childrens: [],
  },
  LinearProgress: {
    name: 'LinearProgress',
    path: path.join(
      __dirname,
      '../../../src/LinearProgress/LinearProgress.tsx'
    ),
    childrens: [],
  },
  // ListItem: {
  //   name: 'ListItem',
  //   path: path.join(__dirname, '../../../src/ListItem/ListItem.tsx'),
  //   childrens: [
  //     {
  //       name: 'Accordion',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.Accordion.tsx'
  //       ),
  //     },
  //     {
  //       name: 'ButtonGroup',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.ButtonGroup.tsx'
  //       ),
  //     },
  //     {
  //       name: 'CheckBox',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.CheckBox.tsx'
  //       ),
  //     },
  //     {
  //       name: 'Chevron',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.Chevron.tsx'
  //       ),
  //     },
  //     {
  //       name: 'Content',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.Content.tsx'
  //       ),
  //     },
  //     {
  //       name: 'Input',
  //       path: path.join(__dirname, '../../../src/ListItem/ListItem.Input.tsx'),
  //     },
  //     {
  //       name: 'Swipeable',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.Swipeable.tsx'
  //       ),
  //     },
  //     {
  //       name: 'SubTitle',
  //       path: path.join(
  //         __dirname,
  //         '../../../src/ListItem/ListItem.Subtitle.tsx'
  //       ),
  //     },
  //     {
  //       name: 'Title',
  //       path: path.join(__dirname, '../../../src/ListItem/ListItem.Title.tsx'),
  //     },
  //   ],
  // },
  Overlay: {
    name: 'Overlay',
    path: path.join(__dirname, '../../../src/Overlay/Overlay.tsx'),
    childrens: [],
  },
  PricingCard: {
    name: 'PricingCard',
    path: path.join(__dirname, '../../../src/PricingCard/PricingCard.tsx'),
    childrens: [],
  },
  Slider: {
    name: 'Slider',
    path: path.join(__dirname, '../../../src/Slider/Slider.tsx'),
    childrens: [],
  },
  SocialIcon: {
    name: 'SocialIcon',
    path: path.join(__dirname, '../../../src/SocialIcon/SocialIcon.tsx'),
    childrens: [],
  },
  SpeedDial: {
    name: 'SpeedDial',
    path: path.join(__dirname, '../../../src/SpeedDial/SpeedDial.tsx'),
    childrens: [],
  },
  Switch: {
    name: 'Switch',
    path: path.join(__dirname, '../../../src/Switch/Switch.tsx'),
    childrens: [],
  },
  // Tab: {
  //   name: 'Tab',
  //   path: path.join(__dirname, '../../../src/Tab/Tab.tsx'),
  //   childrens: [
  //     {
  //       name: 'Item',
  //       path: path.join(__dirname, '../../../src/Tab/Tab.Item.tsx'),
  //     },
  //   ],
  // },
  // TabView: {
  //   name: 'TabView',
  //   path: path.join(__dirname, '../../../src/TabView/TabView.tsx'),
  //   childrens: [
  //     {
  //       name: 'Item',
  //       path: path.join(__dirname, '../../../src/TabView/TabView.Item.tsx'),
  //     },
  //   ],
  // },
  Text: {
    name: 'Text',
    path: path.join(__dirname, '../../../src/Text/Text.tsx'),
    childrens: [],
  },
  Tile: {
    name: 'Tile',
    path: path.join(__dirname, '../../../src/Tile/Tile.tsx'),
    childrens: [],
  },
};
