import * as path from 'path';
import fs from 'fs';

import {TSDocParser, TSDocConfiguration, ParserContext} from '@microsoft/tsdoc';
import {TSDocConfigFile} from '@microsoft/tsdoc-config';

const mySourceFile = './src/shared/AbstractEvent/AbstractEvent.ts';

const tsdocConfigFile: TSDocConfigFile = TSDocConfigFile.loadForFolder(
  path.dirname(mySourceFile),
);
if (tsdocConfigFile.hasErrors) {
  // Report any errors
  console.log(tsdocConfigFile.getErrorSummary());
}

const tsdocConfiguration: TSDocConfiguration = new TSDocConfiguration();
tsdocConfigFile.configureParser(tsdocConfiguration);
const tsdocParser: TSDocParser = new TSDocParser(tsdocConfiguration);

// console.log(tsdocParser.configuration);

const parserContext: ParserContext = tsdocParser.parseString(
  fs.readFileSync(mySourceFile, {encoding: 'utf8'}),
);

if (parserContext.log.messages.length > 0) {
  throw new Error(`Syntax error: ${parserContext.log.messages[0].text}`);
}

console.log(parserContext.docComment.params.blocks);
