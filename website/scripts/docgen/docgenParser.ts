import { withDefaultConfig } from 'react-docgen-typescript';

const themeProps = ['theme', 'updateTheme', 'replaceTheme'];
const componentsWithParentsTypeToBeParsed = ['AirbnbRating'];

// The config object is passed to the parser.
const parserOptions = {
  savePropValueAsString: true,
  propFilter: (prop, component) => {
    if (themeProps.includes(prop.name)) {
      return false;
    }
    // To deal with the props of type StyleProp<ViewStyle> and StyleProp<TextStyle>
    if (prop?.type?.name.includes('StyleProp')) {
      if (prop.type.name.includes('TextStyle')) {
        prop.type.name = 'Text Style(Object)';
      } else {
        prop.type.name = 'View style(Object)';
      }
    }

    // To deal with the props of type Partial<>
    if (prop?.type?.name.includes('Partial')) {
      const propName = prop.type.name;
      prop.type.name =
        propName.substring(
          propName.lastIndexOf('<') + 1,
          propName.lastIndexOf('>')
        ) + '(Object)';
    }

    // To deal with the platform specific props default value
    if (prop?.defaultValue?.value.includes('Platform.select')) {
      const defaultValue = prop.defaultValue.value;
      prop.defaultValue.value = defaultValue
        .substring(
          defaultValue.lastIndexOf('{'),
          defaultValue.lastIndexOf('}') + 1
        )
        .replace(/\r\n/g, '');
    }

    // To deal with the prop of defaultValue onPress || onLongPress ? TouchableOpacity : View in Avatar
    if (
      prop?.defaultValue?.value ===
      'onPress || onLongPress ? TouchableOpacity : View'
    ) {
      prop.defaultValue.value = 'TouchableOpacity or View';
    }
    if (
      prop.declarations !== undefined &&
      prop.declarations.length > 0 &&
      !componentsWithParentsTypeToBeParsed.includes(component.name)
    ) {
      return Boolean(
        prop.declarations.find((declaration) => {
          return declaration.fileName.includes(component.name);
        })
      );
    }
    return true;
  },
};

export const docgenParser = withDefaultConfig(parserOptions);
