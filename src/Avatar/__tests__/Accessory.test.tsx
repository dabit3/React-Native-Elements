import React from 'react';
import Avatar from '..';
import { renderWithTheme, renderWithWrapper } from '../../../.ci/testHelper';

describe('Accessory Component', () => {
  jest.useFakeTimers();
  it('uses Icon', () => {
    const component = renderWithTheme(<Avatar.Accessory />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('uses Image', () => {
    const { wrapper } = renderWithWrapper(
      <Avatar.Accessory source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }} />,
      'RNE__Image'
    );
    expect(wrapper.props.source.uri).toMatch('https://i.imgur.com/0y8Ftya.jpg');
  });
});
