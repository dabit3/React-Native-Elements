import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import theme from '../../config/theme';
import { FloatingTextInput } from '../floatingInput';
import { Input } from '../Input';

describe('Input component', () => {
  beforeAll(() => {
    // useNativeDriver isn't available in jest, so just silencing the warning
    global.console.warn = () => null;
  });

  it('should match snapshot', () => {
    const component = shallow(<FloatingTextInput theme={theme} />);
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    it('label', () => {
      const component = shallow(
        <FloatingTextInput theme={theme} label="My Label Name" />
      );
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('value', () => {
      const component = shallow(
        <FloatingTextInput theme={theme} value="My Value" />
      );
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('labelActiveSize', () => {
      const component = shallow(<FloatingTextInput labelActiveSize={14} />);
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('labelInActiveSize', () => {
      const component = shallow(<FloatingTextInput labelInActiveSize={15} />);
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('labelActiveColor', () => {
      const component = shallow(
        <FloatingTextInput theme={theme} labelActiveColor="#86939E" />
      );
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('labelInActiveColor', () => {
      const component = shallow(
        <FloatingTextInput theme={theme} labelInActiveColor="#5E6977" />
      );
      expect(component.length).toBe(1);
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('Instance methods', () => {
    it('should focus the input', () => {
      const focus = jest.fn();
      const component = shallow(<Input theme={theme} />);
      const instance = component.instance();
      // Refs not available in shallow render
      instance.input = {
        focus,
      };
      instance.focus();
      expect(focus).toHaveBeenCalledTimes(1);
    });

    it('should blur the input', () => {
      const blur = jest.fn();
      const component = shallow(<Input theme={theme} />);
      const instance = component.instance();
      // Refs not available in shallow render
      instance.input = {
        blur,
      };
      instance.blur();
      expect(blur).toHaveBeenCalledTimes(1);
    });
  });
});
