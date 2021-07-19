import React from 'react';
import Badge from '..';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { renderWithTheme, renderWithWrapper } from '../../../.ci/testHelper';
import { fireEvent } from '@testing-library/react-native';
import { colors } from '../../config';

describe('Badge Component', () => {
  it('should render without issue', () => {
    const component = renderWithWrapper(<Badge value={10} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render if element included', () => {
    const component = renderWithWrapper(<Badge value={<Text>foo</Text>} />);
    expect(component.queryByText('foo')).toBeTruthy();
  });

  it('should pass value props should still work', () => {
    const component = renderWithWrapper(<Badge value="foo" />);
    expect(component.queryByText('foo')).toBeTruthy();
  });

  it('should apply container style in the badge', () => {
    const { wrapper } = renderWithWrapper(
      <Badge value={10} containerStyle={{ backgroundColor: 'orange' }} />
    );
    expect(wrapper.findByType(View).props.style.backgroundColor).toBe('orange');
  });

  it('should allow badge style', () => {
    const { wrapper } = renderWithWrapper(
      <Badge value={10} badgeStyle={{ backgroundColor: 'pink' }} />,
      'RNE__Badge'
    );
    expect(wrapper.props.style.backgroundColor).toBe('pink');
  });

  it('should allow custom component', () => {
    const { wrapper } = renderWithWrapper(
      <Badge value={10} Component={TouchableWithoutFeedback} />
    );
    expect(wrapper.findAllByType(TouchableWithoutFeedback).length).toBe(1);
  });

  it('should have a touchable when onPress is passed in', () => {
    const handler = jest.fn();
    const { wrapper } = renderWithWrapper(
      <Badge value={10} onPress={handler} />
    );
    const component = wrapper.findByType(TouchableOpacity);
    fireEvent.press(component);
    expect(handler).toBeCalledTimes(1);
  });

  it('text props', () => {
    const { getAllByTestId } = renderWithTheme(
      <Badge textProps={{ testID: 'text' }} value={10} />
    );
    const elements = getAllByTestId('text');
    expect(elements).toHaveLength(1);
  });

  describe('Mini badge', () => {
    it.each`
      status
      ${'primary'}
      ${'success'}
      ${'warning'}
      ${'error'}
    `('accepts $status', ({ status }) => {
      const { wrapper } = renderWithWrapper(
        <Badge status={status} />,
        'RNE__Badge'
      );
      expect(wrapper.props.style.backgroundColor).toBe(colors[status]);
    });
  });

  it('should use values set by the theme', () => {
    const testTheme = {
      Badge: {
        textStyle: { color: 'red' },
      },
    };
    const { wrapper } = renderWithWrapper(<Badge value="red" />, '', testTheme);
    expect(wrapper.findByType(Text).props.style).toMatchObject({
      color: 'red',
    });
  });
});
