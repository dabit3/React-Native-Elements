import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withBadge } from '../index';
import { renderWithWrapper } from '../../../.ci/testHelper';

describe('withBadge HOC', () => {
  describe('just value', () => {
    it('should render with just a value', () => {
      const BadgedComponent = withBadge('hello')(TouchableOpacity);
      const component = renderWithWrapper(<BadgedComponent />);
      expect(component.queryByText('hello')).toBeTruthy();
    });

    it('should render when given a function as value', () => {
      const BadgedComponent = withBadge(() => 'hello')(TouchableOpacity);
      const component = renderWithWrapper(<BadgedComponent />);
      expect(component.queryByText('hello')).toBeTruthy();
    });
  });

  describe('with options', () => {
    it('should render without issue even with BadgeProps', () => {
      const options = {
        top: 0,
        bottom: 5,
      };
      const BadgedComponent = withBadge(1, options)(TouchableOpacity);
      const { wrapper } = renderWithWrapper(
        <BadgedComponent />,
        'RNE__Badge__Container'
      );
      expect(wrapper.props.style).toMatchObject({
        top: 0,
        bottom: 5,
      });
    });

    it('should not render when hidden is true', () => {
      const options = {
        hidden: true,
      };
      const BadgedComponent = withBadge(1, options)(TouchableOpacity);
      const { wrapper } = renderWithWrapper(<BadgedComponent />, 'RNE__Badge');
      expect(wrapper).toBeFalsy();
    });
  });
});
