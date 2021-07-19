import { Avatar, AvatarProps } from './Avatar';
import { Accessory, AccessoryProps } from './Avatar.Accessory';
import { withTheme } from '../config';

const ThemedAccessory = withTheme(Accessory, 'Accessory');

const ThemedAvatar = Object.assign(withTheme(Avatar, 'Avatar'), {
  Accessory: ThemedAccessory,
});

export { Avatar, Accessory };
export type { AccessoryProps, AvatarProps };
export default ThemedAvatar;
