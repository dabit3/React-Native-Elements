import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { renderWithTheme } from '../../../.ci/testHelper';
import { FullTheme } from '../../config/theme';
import Icon from '../../Icon';
import Button from '../index';

describe('Button Component', () => {
  it('should render without issues', () => {
    const TITLE = 'My Button';
    const { queryByTestId, queryByText } = renderWithTheme(
      <Button title={TITLE} />
    );
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    expect(queryByText(TITLE)).toBeTruthy();
    expect(wrapper).not.toBeNull();
  });

  it('should render icon', () => {
    const ICON_NAME = 'edit';
    const { queryByTestId } = renderWithTheme(
      <Button icon={{ name: ICON_NAME }} />
    );
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    const iconTree = wrapper.findByType(Icon);
    expect(iconTree.props.name).toBe(ICON_NAME);
    expect(iconTree).not.toBeNull();
  });

  it('should be call onPress events', () => {
    const onPress = jest.fn();
    const { queryByTestId } = renderWithTheme(<Button onPress={onPress} />);
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    const touchableOpacityTree = wrapper.findByType(TouchableOpacity);
    fireEvent(touchableOpacityTree, 'press');
    expect(onPress).toHaveBeenCalled();
  });

  it('should be NOT call onPress events while loading', () => {
    const onPress = jest.fn();
    const { queryByTestId } = renderWithTheme(
      <Button loading onPress={onPress} />
    );
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    const touchableOpacityTree = wrapper.findByType(TouchableOpacity);
    fireEvent(touchableOpacityTree, 'press');
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should be NOT call onPress events if disabled', () => {
    const onPress = jest.fn();
    const { queryByTestId } = renderWithTheme(
      <Button disabled onPress={onPress} />
    );
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    const touchableOpacityTree = wrapper.findByType(TouchableOpacity);
    fireEvent(touchableOpacityTree, 'press');
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('Button type', () => {
    // Test for each type of button variant
    describe.each`
      type
      ${'solid'}
      ${'outline'}
      ${'clear'}
    `('$type', ({ type }) => {
      it(`should display ${type} button`, () => {
        const { toJSON } = renderWithTheme(<Button title={type} />);
        expect(toJSON()).toMatchSnapshot();
      });

      it(`should display raised ${type} button`, () => {
        const { toJSON } = renderWithTheme(<Button title={type} raised />);
        expect(toJSON()).toMatchSnapshot();
      });

      it(`should display disabled ${type} button`, () => {
        const { toJSON } = renderWithTheme(<Button title={type} disabled />);
        expect(toJSON()).toMatchSnapshot();
      });
    });
  });

  it('should apply values from theme', () => {
    const testTheme: Partial<FullTheme> = {
      Button: {
        loading: true,
      },
    };
    const { queryByTestId } = renderWithTheme(<Button />, testTheme);
    const wrapper = queryByTestId('RNE_BUTTON_WRAPPER');
    expect(wrapper.findByType(ActivityIndicator)).toBeTruthy();
  });

  it('should apply title from theme', () => {
    const testTheme: Partial<FullTheme> = {
      Button: {
        title: 'Custom Button',
      },
    };
    const { queryByText } = renderWithTheme(<Button />, testTheme);
    expect(queryByText(String(testTheme.Button.title))).toBeTruthy();
  });
});
