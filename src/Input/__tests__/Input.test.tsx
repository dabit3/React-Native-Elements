import React from 'react';
import { View, TextInput, Image, Animated } from 'react-native';
import Input from '../index';
import { renderWithTheme } from '../../../.ci/testHelper';
import { fireEvent } from '@testing-library/react-native';
import Icon from '../../Icon';
import { FullTheme } from '../../config';

describe('Input component', () => {
  it('should match snapshot', () => {
    const { toJSON, queryByTestId } = renderWithTheme(<Input />);
    const component = queryByTestId('RNE__Input__view-wrapper');
    expect(component).not.toBeNull();
    expect(toJSON()).toMatchSnapshot();
  });

  describe('Props', () => {
    it('containerStyle', () => {
      const { queryByTestId } = renderWithTheme(
        <Input containerStyle={{ width: 200 }} />
      );
      const component = queryByTestId('RNE__Input__view-wrapper');
      expect(component.props.style).toMatchObject({ width: 200 });
    });

    it('inputContainerStyle', () => {
      const { queryByTestId } = renderWithTheme(
        <Input inputContainerStyle={{ width: 200 }} />
      );
      const component = queryByTestId('RNE__Input__view-wrapper');
      const inputTree = component.findByType(Animated.View);
      expect(inputTree.props.style.width).toBe(200);
    });

    it('inputStyle', () => {
      const { queryByTestId } = renderWithTheme(
        <Input inputStyle={{ width: 200 }} />
      );
      const component = queryByTestId('RNE__Input__view-wrapper');
      const inputTree = component.findByType(TextInput);
      expect(inputTree.props.style.width).toBe(200);
    });

    it('disabled', () => {
      const { queryByTestId } = renderWithTheme(<Input disabled={true} />);
      const component = queryByTestId('RNE__Input__view-wrapper');
      const inputTree = component.findByType(TextInput);
      expect(inputTree.props.editable).toBe(false);
    });

    describe('leftIcon and styles', () => {
      it('leftIcon', () => {
        const { queryByTestId } = renderWithTheme(
          <Input leftIcon={{ type: 'feather', name: 'user' }} />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        const iconTree = component.findByType(Icon);
        expect(iconTree).not.toBeNull();
        expect(iconTree.props).toMatchObject({ type: 'feather', name: 'user' });
      });

      it('leftIconContainerStyle', () => {
        const { queryByTestId } = renderWithTheme(
          <Input
            leftIcon={{ type: 'feather', name: 'user' }}
            leftIconContainerStyle={{ width: 200 }}
          />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        const iconTree = component.findByType(Icon);
        expect(iconTree).not.toBeNull();
        expect(iconTree.props).toMatchObject({ type: 'feather', name: 'user' });
        expect(iconTree.parent.props.style.width).toBe(200);
      });
    });
    describe('rightIcon and styles', () => {
      it('rightIcon', () => {
        const { queryByTestId } = renderWithTheme(
          <Input rightIcon={{ type: 'feather', name: 'user' }} />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        const iconTree = component.findByType(Icon);
        expect(iconTree).not.toBeNull();
        expect(iconTree.props).toMatchObject({ type: 'feather', name: 'user' });
      });

      it('rightIconContainerStyle', () => {
        const { queryByTestId } = renderWithTheme(
          <Input
            rightIcon={{ type: 'feather', name: 'user' }}
            rightIconContainerStyle={{ width: 200 }}
          />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        const iconTree = component.findByType(Icon);
        expect(iconTree).not.toBeNull();
        expect(iconTree.props).toMatchObject({ type: 'feather', name: 'user' });
        expect(iconTree.parent.props.style.width).toBe(200);
      });
    });

    describe('label and styles', () => {
      it('label', () => {
        const { queryByText } = renderWithTheme(<Input label="My Label" />);
        const textTree = queryByText('My Label');
        expect(textTree).not.toBeNull();
      });

      it('labelStyle', () => {
        const { queryByText } = renderWithTheme(
          <Input label="My Label" labelStyle={{ width: 200 }} />
        );
        const textTree = queryByText('My Label');
        expect(textTree).not.toBeNull();
        expect(textTree.props.style.width).toBe(200);
      });

      it('label as component', () => {
        const { queryByTestId } = renderWithTheme(
          <Input label={<Image source={{ uri: 'http://google.com' }} />} />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        const childLabelTree = component.findByType(Image);
        expect(childLabelTree).not.toBeNull();
        expect(childLabelTree.props.source.uri).toBe('http://google.com');
      });
    });

    describe('errorMessage and style', () => {
      it('errorMessage', () => {
        const { queryByText } = renderWithTheme(
          <Input errorMessage="My Error Message" />
        );
        const textTree = queryByText('My Error Message');
        expect(textTree).not.toBeNull();
      });

      it('errorStyle', () => {
        const { queryByText } = renderWithTheme(
          <Input errorMessage="My Error Message" errorStyle={{ width: 200 }} />
        );
        const textTree = queryByText('My Error Message');
        expect(textTree).not.toBeNull();
        expect(textTree.props.style.width).toBe(200);
      });
    });

    it('placeholder', () => {
      const { queryByTestId } = renderWithTheme(
        <Input placeholder="My Placeholder" />
      );
      const component = queryByTestId('RNE__Input__text-input');
      expect(component.props.placeholder).toBe('My Placeholder');
    });

    it('inputComponent', () => {
      const CustomComponent: React.FC = (props) => (
        <View {...props} testID="myView">
          Custom!
        </View>
      );
      const { queryByTestId } = renderWithTheme(
        <Input InputComponent={CustomComponent} />
      );
      expect(queryByTestId('myView')).not.toBeNull();
    });

    it('should trigger onChange', () => {
      const changeText = jest.fn();
      const { queryByTestId } = renderWithTheme(
        <Input onChangeText={changeText} />
      );
      const component = queryByTestId('RNE__Input__view-wrapper');
      fireEvent.changeText(component, 'myText');
      expect(changeText).toHaveBeenCalledTimes(1);
    });

    describe('Instance methods', () => {
      it('should focus the input', () => {
        const focus = jest.fn();
        const ref = React.createRef<TextInput>();
        const { queryByTestId } = renderWithTheme(
          <Input ref={ref} testID="demo" onFocus={focus} />
        );
        const component = queryByTestId('RNE__Input__view-wrapper');
        fireEvent(component.findByType(TextInput), 'focus');
        expect(focus).toHaveBeenCalledTimes(1);
      });
    });
    it('should apply values from theme', () => {
      const testTheme: Partial<FullTheme> = {
        Input: {
          placeholder: 'Enter text',
        },
      };
      const { queryByTestId } = renderWithTheme(<Input />, testTheme);
      const component = queryByTestId('RNE__Input__text-input');
      expect(component.props.placeholder).toBe(testTheme.Input.placeholder);
    });
  });
});
