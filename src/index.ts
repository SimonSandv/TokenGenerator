import * as fs from 'fs';
import * as path from 'path';
import {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
    cleanVariableNames
} from './stringUtils';

// Set read and write file paths/names.
const inputJsonFile = path.join(__dirname, '..', 'src', 'input.json');
const tokensDir = path.join(__dirname, '..', 'dist', 'tokens');
const JsonFile = path.join(tokensDir, 'tokens.json');
const tsFile = path.join(tokensDir, 'tokens.ts');
const tsDeclarationFile = path.join(tokensDir, 'tokens.d.ts')
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

  let tsOutput = 'export const tokens = {\n';
  let dTsOutput = 'export interface Token {\n  value: string;\n  type: string;\n}\n\nexport interface Tokens {\n';

  for (const key in input) {
    tsOutput += `  ${toCamelCase(key)}: { value: '${input[key].value}', type: '${input[key].type}' },\n`;
    dTsOutput += `  ${toCamelCase(key)}: Token;\n`;
  }

  tsOutput += '};\n\nexport default tokens;';
  dTsOutput += '}\n\ndeclare const tokens: Tokens;\nexport default tokens;';

  fs.writeFileSync(tsFile, tsOutput);
  fs.writeFileSync(tsDeclarationFile, dTsOutput);
};

const createDesignSystemClass = () => {
  const rawInput = fs.readFileSync(JsonFile, 'utf8');
  const input = JSON.parse(rawInput);

  let classOutput = 'import { Color, Hex, Hsl, Rgb } from \'./colors\';\n\n';
  classOutput += 'export class DesignSystem {\n';

  for (const key in input) {
    const propertyName = toPascalCase(key);
    if (input[key].type === 'color') {
      classOutput += `  public static ${propertyName} : Color = new Color(new Hex("${input[key].value}"));\n`;
    } else {
      classOutput += `  public static ${propertyName} : string = '${input[key].value}';\n`;
    }
  }

  classOutput += '}\n';

  fs.writeFileSync(path.join(tokensDir, 'designSystem.ts'), classOutput);
};

const main = () =>
{
  // Delete the previous tokens folder, if it exists.
  if (fs.existsSync(tokensDir)) {
    fs.rmSync(tokensDir, { recursive: true });
  }

  // Create the tokens folder.
    fs.mkdirSync(tokensDir);
    
    createJSON();
    createCSS();
    createSCSS();
    createTS();
    createDesignSystemClass();
};

main();