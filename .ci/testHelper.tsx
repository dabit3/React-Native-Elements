import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider, FullTheme, colors } from '../src/config';
import deepmerge from 'deepmerge';

export const renderWithTheme = (
  children: any,
  themeProp: Partial<FullTheme> = {},
  options?: RenderOptions
) => {
  return render(
    <ThemeProvider theme={deepmerge({ colors }, themeProp)}>
      {children}
    </ThemeProvider>,
    options
  );
};
