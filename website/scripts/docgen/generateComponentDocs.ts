import { docgenParser } from './docgenParser';

// Function to generate the component docs.
// Input - Array of component files.
// Output - Component Docs in a single object.
export function generateComponentDocs(componentFilePaths: string[]) {
  return docgenParser
    .parse(componentFilePaths)
    .reduce((componentDocs, componentDoc) => {
      const componentDisplayName = componentDoc.displayName;

      // The props are sorted on the basis of key(name of prop).
      const orderedProps = Object.keys(componentDoc.props)
        .sort()
        .reduce((obj, key) => {
          obj[key] = componentDoc.props[key];
          return obj;
        }, {});
      componentDoc.props = orderedProps;
      componentDocs[componentDisplayName] = componentDoc;

      return componentDocs;
    }, {});
}
