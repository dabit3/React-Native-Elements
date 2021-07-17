import React from 'react';
import { BottomSheet } from '../index';
import { Modal, ScrollView } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ListItem from '../../ListItem/index';
import toJson from 'enzyme-to-json';

describe('BottomSheet Component', () => {
  it('renders correctly', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const tree = renderer
      .create(
        <BottomSheet isVisible>
          {list.map((l, i) => (
            <ListItem key={i}>
              <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows when isVisible is true', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const component = shallow(
      <BottomSheet isVisible>
        {list.map((l, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
    expect(component.find(Modal).props().visible).toBeTruthy();
  });

  it('not show when isVisible is false', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const component = shallow(
      <BottomSheet>
        {list.map((l, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
    expect(component.find(Modal).props().visible).toBeFalsy();
  });

  it('should click the backdrop and use passed handler', () => {
    const onBackdropPress = jest.fn();
    const list = [{ title: 'test' }, { title: 'test2' }];
    const wrapper = shallow(
      <BottomSheet isVisible onBackdropPress={onBackdropPress}>
        {list.map((l, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
    wrapper.dive().find({ testID: 'RNE__Overlay__backdrop' }).simulate('press');
    expect(onBackdropPress).toHaveBeenCalled();
  });

  it('should render with the provided containerStyle', () => {
    const component = shallow(
      <BottomSheet
        isVisible={true}
        containerStyle={{ backgroundColor: 'rgba(1, 0.5, 0.25, 1.0)' }}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render ScrollView with the provided scrollViewProps', () => {
    const component = shallow(
      <BottomSheet
        isVisible={true}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      />
    );
    expect(component.find(ScrollView).props().keyboardShouldPersistTaps).toBe(
      'handled'
    );
  });
});
