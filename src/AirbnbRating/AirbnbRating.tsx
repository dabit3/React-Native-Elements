import React from 'react';
import {
  AirbnbRating as TapRating,
  TapRatingProps as RatingProps,
} from 'react-native-ratings';
import { RneFunctionComponent } from '../helpers';

export type TapRatingProps = RatingProps;

/** Ratings are used to collect measurable feedback from users.
 * Use Rating over an Input where imagery can increase user interaction.
 * This component is imported from [react-native-ratings](https://github.com/Monte9/react-native-ratings).
 * There are two types of rating - TapRating and SwipeRating.
 * This documentation is for Tap Rating version. */
export const AirbnbRating: RneFunctionComponent<TapRatingProps> = () => {
  return <TapRating />;
};

AirbnbRating.displayName = 'AirbnbRating';
