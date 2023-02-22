import * as fs from 'fs';
import * as path from 'path';
import {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
    cleanVariableNames
} from './util';

// Set read and write file paths/names.
const inputJsonFile = path.join(__dirname, '..', 'src', 'input.json');
const tokensDir = path.join(__dirname, '..', 'dist', 'tokens');
const JsonFile = path.join(tokensDir, 'tokens.json');
const tsFile = path.join(tokensDir, 'tokens.ts');
const cssFile = path.join(tokensDir, 'tokens.css');
const scssFile = path.join(tokensDir, 'tokens.scss');

const createJSON = () =>
{
  const rawInput = fs.readFileSync(inputJsonFile, 'utf8');
  const input = JSON.parse(rawInput);
  const cleaned = cleanVariableNames(input, "kebab");
  const output = JSON.stringify(cleaned, null, 2);
  fs.writeFileSync(JsonFile, output);
};

const createCSS = () => {
  const rawInput = fs.readFileSync(JsonFile, 'utf8');
  const input = JSON.parse(rawInput);
  let output = ':root {\n';
  for (const key in input) {
    output += `--${toKebabCase(key)}: ${input[key].value};\n`;
  }
  output += '}';
  fs.writeFileSync(cssFile, output);
};

const createSCSS = () => {
  const rawInput = fs.readFileSync(JsonFile, 'utf8');
  const input = JSON.parse(rawInput);
  let output = ':root {\n';
  for (const key in input) {
    output += `$${toKebabCase(key)}: ${input[key].value};\n`;
  }
  output += '}';
  fs.writeFileSync(scssFile, output);
};

const createTS = () => {
  const rawInput = fs.readFileSync(JsonFile, 'utf8');
  const input = JSON.parse(rawInput);
  let output = 'const tokens = {\n';
  for (const key in input) {
    output += `  ${toCamelCase(key)}: { value: '${input[key].value}', type: '${input[key].type}' },\n`;
  }
  output += '};\n\nexport default tokens;';
  fs.writeFileSync(tsFile, output);
};

const main = () =>
{
  // Delete the previous tokens folder, if it exists.
  if (fs.existsSync(tokensDir)) {
    fs.rmdirSync(tokensDir, { recursive: true });
  }

  // Create the tokens folder.
    fs.mkdirSync(tokensDir);
    
    createJSON();
    createCSS();
    createSCSS();
    createTS();
};

main();