import React from 'react';
import { RneFunctionComponent } from '../../helpers';
import getIconType from '../../helpers/getIconType';
import { IconType } from '../../Icon';

export type CheckBoxIconProps = {
  /** Flag for checking the icon. */
  checked: boolean;

  /** onPress function for checkbox. */
  onIconPress?(): void;

  /** onLongPress function for checkbox. */
  onLongIconPress?(): void;

  /** Size of the checkbox. */
  size?: number;

  /** Default checked icon ([Font Awesome Icon](http://fontawesome.io/icons/)). */
  checkedIcon?: string | React.ReactElement<{}>;

  /** Default checked icon ([Font Awesome Icon](http://fontawesome.io/icons/)) */
  uncheckedIcon?: string | React.ReactElement<{}>;

  /** Type of icon set. [Supported sets here](icon#available-icon-sets). */
  iconType?: IconType;

  /** Default checked color. */
  checkedColor?: string;

  /** Default unchecked color. */
  uncheckedColor?: string;
};

export const CheckBoxIcon: RneFunctionComponent<CheckBoxIconProps> = ({
  checked,
  onIconPress,
  onLongIconPress,
  size = 24,
  checkedIcon = 'check-square-o',
  uncheckedIcon = 'square-o',
  iconType,
  checkedColor,
  uncheckedColor = '#bfbfbf',
}) => {
  if (checked && React.isValidElement(checkedIcon)) {
    return checkedIcon;
  }
  if (!checked && React.isValidElement(uncheckedIcon)) {
    return uncheckedIcon;
  }
  const VectorIcon = iconType
    ? getIconType(iconType)
    : getIconType('font-awesome');
  return (
    <VectorIcon
      color={checked ? checkedColor : uncheckedColor}
      name={checked ? checkedIcon : uncheckedIcon}
      size={size || 24}
      style={{ minWidth: size || 24 }}
      onLongPress={onLongIconPress}
      onPress={onIconPress}
    />
  );
};
