import json2md from 'json2md';

json2md.converters.header = function (input, json2md) {
  return json2md([
    { hr: '' },
    { p: `id: ${input.id.toLowerCase()}` },
    { p: `title: ${input.id}` },
    { p: `slug: /${input.id.toLowerCase()}` },
    { hr: '' },
  ]);
};

json2md.converters.imports = function (input, json2md) {
  if (input.canImportUsage) {
    return json2md([
      {
        p: `import Usage from './usage/${input.component}/${input.component}.md'`,
      },
    ]);
  } else return '';
};

json2md.converters.usage = function (input, json2md) {
  if (input.canImportUsage) {
    return json2md([
      { h2: `Usage` },
      {
        p: `<Usage />`,
      },
      { hr: '' },
    ]);
  } else return '';
};

function generatePropsLinks(props) {
  const propLinks = Object.keys(props).map((key) => {
    return json2md({ link: { title: key, source: `#${key}` } });
  });
  return propLinks;
}

json2md.converters.props = function (input, json2md) {
  let data = json2md({ h2: 'Props' });
  data += json2md({ ul: generatePropsLinks(input) });
  return data;
};

json2md.converters.propsData = function (input, json2md) {
  let data = json2md({ h2: 'Reference' });
  data += Object.keys(input)
    .map((key) => {
      const prop = input[key];
      return json2md([
        { h3: prop.name },
        { p: prop.description },
        {
          table: {
            headers: ['Type', 'Default'],
            rows: [
              {
                Type: prop.type ? prop.type.name : 'None',
                Default: prop.defaultValue ? prop.defaultValue.value : 'None',
              },
            ],
          },
        },
        { hr: '' },
      ]);
    })
    .join('');
  return data;
};

export const generateMarkdown = (data, children) => {
  return json2md([
    { header: { id: data.displayName } },
    {
      imports: {
        component: data.displayName,
        canImportUsage: !children ? true : false,
      },
    },
    { p: data.description },
    {
      usage: {
        canImportUsage: !children ? true : false,
      },
    },
    { props: data.props },
    { propsData: data.props },
  ]);
};
