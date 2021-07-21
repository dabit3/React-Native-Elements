import fs from 'fs-extra';
import path from 'path';
import { generateComponentDocs } from './generateComponentDocs';
import { getComponentFiles } from './getComponentFiles';
import { generateMarkdown } from './generateMarkdown';

const filePaths: string[] = getComponentFiles();
const componentDocs = generateComponentDocs(filePaths);

// Function to set the componentDocs to their respective file and storing it in the .docgen folder.
Object.keys(componentDocs).map((componentDisplayName) => {
  // Condition check for compound components display name.
  const [componentName, childComponentName] = componentDisplayName.split('.');
  let fileName = componentName;
  if (childComponentName) {
    fileName = childComponentName;
  }

  const componentDoc = componentDocs[componentDisplayName];
  const markdownData = generateMarkdown(componentDoc, childComponentName);

  // Ensuring that the directory is present, and if not, create it.
  fs.ensureDirSync(path.join(__dirname, `../../.docgen/${componentName}`));
  fs.outputFile(
    path.join(__dirname, `../../docs/main/${fileName}.md`),
    markdownData
  );
  // fs.writeJSONSync(
  //   path.join(__dirname, `../../.docgen/${componentName}/${fileName}.json`),
  //   componentDocs[componentDisplayName],
  //   {
  //     spaces: 2,
  //   }
  // );
});
