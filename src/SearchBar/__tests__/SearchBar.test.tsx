import React from 'react';
import SearchBar from '../index';
import { renderWithTheme } from '../../../.ci/testHelper';

describe('SearchBar wrapper component', () => {
  it('should render without issues', () => {
    const component = renderWithTheme(<SearchBar />);
    expect(component).not.toBeNull();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render an iOS SearchBar', () => {
    const component = renderWithTheme(<SearchBar platform="ios" />);
    expect(component).not.toBeNull();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render an Android SearchBar', () => {
    const component = renderWithTheme(<SearchBar platform="android" />);
    expect(component).not.toBeNull();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should apply values from theme', () => {
    const theme = {
      SearchBar: {
        placeholder: 'Enter search term',
      },
    };
    const component = renderWithTheme(<SearchBar platform="android" />, theme);
    expect(component.queryByTestId('RNE__SearchBar').props.placeholder).toBe(
      'Enter search term'
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
