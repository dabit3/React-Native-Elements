import React from 'react';
import { Image, View, Text } from 'react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import theme from '../../config/theme';
import { ThemeProvider } from '../../config';
import ThemedCheckBox, { CheckBox } from '../index';

describe('CheckBox Component', () => {
  it('should render without issues', () => {
    const component = shallow(<CheckBox theme={theme} />);
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should use Pressable as default component', () => {
    const component = shallow(<CheckBox theme={theme} />);
    expect(component.find('Pressable').length).toBe(1);
  });

  it('should allow to pass custom component', () => {
    const component = shallow(<CheckBox theme={theme} Component={View} />);
    expect(component.find(View).exists()).toBe(true);
  });

  it('should render title in Text', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        title="Custom Text"
        checked
        checkedTitle="Custom Text"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(component.props().children.props.children[1].props.children).toBe(
      'Custom Text'
    );
  });

  it('should render with wrapperStyle', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        title="Custom Text"
        checked
        wrapperStyle={{ backgroundColor: 'red' }}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(component.props().children.props.children[1].props.children).toBe(
      'Custom Text'
    );
  });

  it('should render with textStyle and fontFamily', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        title="Custom Text"
        checked
        textStyle={{ color: 'red' }}
        fontFamily="serif"
      />
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(component.props().children.props.children[1].props.children).toBe(
      'Custom Text'
    );
  });

  it('should allow title to be custom component', () => {
    shallow(
      <CheckBox
        theme={theme}
        title={
          <View>
            <Text>Custom Component!</Text>
          </View>
        }
      />
    );
  });

  it('should render with icon and checked', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        iconType="font-awesome"
        checkedColor="red"
        containerStyle={{ backgroundColor: 'red' }}
      />
    );
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with icon and iconRight', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        iconType="font-awesome"
        iconRight
        uncheckedColor="blue"
        center
        right
      />
    );
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should allow custom checked Icon', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        checked
        checkedIcon={
          <Image
            source={{ uri: 'https://image.ibb.co/jcY95H/checked.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
        uncheckedIcon={
          <Image
            source={{ uri: 'https://image.ibb.co/fda0Cx/no_check.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
      />
    );
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should allow passing props to the title', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        checked
        title="Yea"
        titleProps={{ numberOfLines: 2 }}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(
      component.find({ testID: 'checkboxTitle' }).props().numberOfLines
    ).toBe(2);
  });

  it('should allow custom checked Icon when unchecked', () => {
    const component = shallow(
      <CheckBox
        theme={theme}
        checked={false}
        checkedIcon={
          <Image
            source={{ uri: 'https://image.ibb.co/jcY95H/checked.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
        uncheckedIcon={
          <Image
            source={{ uri: 'https://image.ibb.co/fda0Cx/no_check.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
      />
    );
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should use values from theme', () => {
    const testTheme = {
      CheckBox: {
        title: 'George is Cool',
      },
    };
    const component = renderer.create(
      <ThemeProvider theme={testTheme}>
        <ThemedCheckBox title="George is Cool" />
      </ThemeProvider>
    );
    expect(
      component.root.findByProps({ testID: 'checkboxTitle' }).props.children
    ).toBe('George is Cool');
  });
});
