import React from 'react';
import Avatar from '..';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { renderWithTheme, renderWithWrapper } from '../../../.ci/testHelper';
import { FullTheme } from '../../config';
import { avatarSizes } from './../Avatar';
import { Icon } from '../../Icon';

describe('Avatar Component', () => {
  jest.useFakeTimers();

  it('should render without issues', () => {
    const { toJSON } = renderWithTheme(
      <Avatar source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders rounded', () => {
    const { wrapper } = renderWithWrapper(
      <Avatar source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }} rounded />
    );
    expect(wrapper.findByType(View).props.style.borderRadius).toBe(
      avatarSizes.small / 2
    );
  });

  it('allows custom imageProps', () => {
    const { wrapper } = renderWithWrapper(
      <Avatar
        source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
        imageProps={{ resizeMode: 'contain' }}
      />
    );
    expect(wrapper.findByType(Image).props.resizeMode).toBe('contain');
  });

  it('renders touchable if onPress given', () => {
    const { wrapper } = renderWithWrapper(
      <Avatar
        source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
        onPress={() => null}
      />
    );
    expect(wrapper.findByType(TouchableOpacity)).toBeTruthy();
  });

  it('should apply values from theme', () => {
    const theme: Partial<FullTheme> = {
      Avatar: {
        source: { uri: 'https://i.imgur.com/0y8Ftya.jpg' },
      },
    };
    const { wrapper } = renderWithWrapper(<Avatar />, '', theme);
    expect(wrapper.findByType(Image).props.source.uri).toBe(
      'https://i.imgur.com/0y8Ftya.jpg'
    );
  });

  describe('Sizes', () => {
    it.each`
      size
      ${'small'}
      ${'medium'}
      ${'large'}
      ${'xlarge'}
    `('accepts $size', ({ size }) => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          size={size}
        />
      );
      expect(wrapper.findByType(View).props.style).toMatchObject({
        height: avatarSizes[size],
        width: avatarSizes[size],
      });
    });

    it('accepts a number', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }} size={30} />
      );
      expect(wrapper.findByType(View).props.style).toMatchObject({
        height: 30,
        width: 30,
      });
    });

    it('default', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }} />
      );
      expect(wrapper.findByType(View).props.style).toMatchObject({
        height: avatarSizes.small,
        width: avatarSizes.small,
      });
    });
  });

  describe('Placeholders', () => {
    it('renders title if given', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          title="John"
        />
      );
      expect(wrapper.findByType(Text).props.children).toBe('John');
    });
    it('renders custom', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          renderPlaceholderContent={
            <Text testID="my-custom-placeholder">Hey</Text>
          }
        />,
        'my-custom-placeholder'
      );
      expect(wrapper.props.children).toBe('Hey');
    });

    it('renders using icon prop', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          icon={{
            name: 'home',
            type: 'material-community',
          }}
          iconStyle={{
            backgroundColor: 'red',
          }}
        />
      );
      expect(wrapper.findByType(Icon).props).toMatchObject({
        name: 'home',
        type: 'material-community',
        style: { backgroundColor: 'red' },
      });
    });

    it('renders using icon with defaults', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          iconStyle={{
            backgroundColor: 'red',
          }}
          icon={{}}
        />
      );
      expect(wrapper.findByType(Icon).props).toMatchObject({
        name: 'account',
        color: 'white',
        style: { backgroundColor: 'red' },
      });
    });

    it('renders using image with imageProps', () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          source={{ uri: 'https://i.imgur.com/0y8Ftya.jpg' }}
          imageProps={{ style: { backgroundColor: 'red' } }}
        />
      );
      const img = wrapper.findByType(Image);
      expect(img.props.source).toMatchObject({
        uri: 'https://i.imgur.com/0y8Ftya.jpg',
      });
      expect(img.props.style).toMatchObject({
        backgroundColor: 'red',
      });
    });

    it("shouldn't show placeholder if not using source", () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          size="medium"
          overlayContainerStyle={{ backgroundColor: 'pink' }}
          title="MD"
        />,
        'RNE__Image__placeholder'
      );
      expect(wrapper.props.style.backgroundColor).toBe('transparent');
    });

    it("shouldn't show placeholder if source doesn't contain uri property", () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          size="medium"
          overlayContainerStyle={{ backgroundColor: 'pink' }}
          title="MD"
          source={{}}
        />,
        'RNE__Image__placeholder'
      );
      expect(wrapper.props.style.backgroundColor).toBe('transparent');
    });

    it("shouldn't show placeholder if source exists but uri is undefined", () => {
      const { wrapper } = renderWithWrapper(
        <Avatar
          size="medium"
          overlayContainerStyle={{ backgroundColor: 'pink' }}
          title="MD"
          source={{ uri: undefined }}
        />,
        'RNE__Image__placeholder'
      );
      expect(wrapper.props.style.backgroundColor).toBe('transparent');
    });
  });
});
