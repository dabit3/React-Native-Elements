import React from 'react';
import { Image as RNImage } from 'react-native';
import Image from '../index';
import { renderWithTheme } from '../../../.ci/testHelper';

jest.useFakeTimers();

describe('Image Component', () => {
  const FAKE_URI = 'https://i.imgur.com/0y8Ftya.jpg';
  it('should render', () => {
    const { toJSON } = renderWithTheme(
      <Image testID="customTestId" source={{ uri: FAKE_URI }} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render the appropriate testId when one is passed.', () => {
    const { queryByTestId } = renderWithTheme(
      <Image testID="customTestId" source={{ uri: FAKE_URI }} />
    );
    const image = queryByTestId('customTestId');
    expect(image.props.source.uri).toBe(FAKE_URI);
  });
  it('should render the appropriate testId when one is not passed.', () => {
    const { queryByTestId } = renderWithTheme(
      <Image source={{ uri: FAKE_URI }} />
    );
    const image = queryByTestId('RNE__Image');
    expect(image.props.source.uri).toBe(FAKE_URI);
  });
  it('should apply values from theme', () => {
    const textTheme = {
      Image: {
        placeholderStyle: {
          backgroundColor: 'red',
        },
      },
    };
    const { queryByTestId } = renderWithTheme(
      <Image source={{ uri: FAKE_URI }} />,
      textTheme
    );
    const placeholder = queryByTestId('RNE__Image__placeholder');
    expect(placeholder.props.style.backgroundColor).toBe('red');
  });

  it('should render without the transition', () => {
    const { queryByTestId } = renderWithTheme(
      <Image source={{ uri: FAKE_URI }} transition={false} />
    );
    const image = queryByTestId('RNE__Image');
    expect(image.props.onLoad).not.toBeNull();
  });

  it('should apply value from style prop', () => {
    const { queryByTestId } = renderWithTheme(
      <Image source={{ uri: FAKE_URI }} style={{ tintColor: 'red' }} />
    );
    const image = queryByTestId('RNE__Image');
    expect(image.props.style.tintColor).toBe('red');
  });

  it('should apply value from childrenContainerStyle prop', () => {
    const { queryByTestId } = renderWithTheme(
      <Image
        source={{ uri: FAKE_URI }}
        childrenContainerStyle={{
          borderWidth: 1,
          borderColor: 'red',
        }}
      />
    );
    const childContainer = queryByTestId('RNE__Image__children__container');

    expect(childContainer.props.style).toMatchObject({
      borderWidth: 1,
      borderColor: 'red',
    });
  });

  it('static methods should be present', () => {
    expect(Image.getSize).toBe(RNImage.getSize);
    expect(Image.getSizeWithHeaders).toBe(RNImage.getSizeWithHeaders);
    expect(Image.prefetch).toBe(RNImage.prefetch);
    expect(Image.abortPrefetch).toBe(RNImage.abortPrefetch);
    expect(Image.queryCache).toBe(RNImage.queryCache);
    expect(Image.resolveAssetSource).toBe(RNImage.resolveAssetSource);
  });
});
