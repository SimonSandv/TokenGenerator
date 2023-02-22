## Summary

This code is a Node.js script that reads data from an input JSON file and generates several output files containing token values in different formats. These token values are likely used for styling or design purposes in a web or mobile application.

Here is a brief summary of what this script does:

- It imports the fs (file system) and path modules, as well as several functions from a util.js module.
- It sets several file paths for input and output files.
- It defines four functions: createJSON(), createCSS(), createSCSS(), and createTS().
- It defines a main() function that creates a new directory for the output files and then calls the four functions in order to generate the output files.
- It calls the main() function at the end of the script to run the program.


The createJSON() function reads the input JSON file, cleans the variable names to kebab-case format, and writes the cleaned data to an output JSON file.

The createCSS() function reads the output JSON file created by createJSON(), converts each key-value pair into a CSS custom property in kebab-case format, and writes the resulting CSS code to an output file.

The createSCSS() function is similar to createCSS(), but it generates SCSS code instead.

The createTS() function is similar to createJSON(), but it generates a TypeScript object with camelCase variable names and writes the resulting code to an output file.

Overall, this script is a tool for generating design tokens in multiple formats for use in a web or mobile application.

# Design Tokens Generator

This Node.js script generates design tokens in various formats (JSON, CSS, SCSS, and TypeScript) from an input JSON file. Design tokens are a set of key-value pairs that define visual design properties, such as colors, typography, spacing, and more. These tokens can be used to ensure visual consistency across a web or mobile application.

## Installation

Clone the repository or download the source code.

Install Node.js on your computer, if not already installed.

Open a terminal or command prompt and navigate to the project directory.

Install the dependencies by running the following command:

```npm install```

## Usage

1. Create an input JSON file that contains the design tokens in the following format:

```json
{
  "tokenName": {
    "value": "tokenValue",
    "type": "tokenType"
  },
  // more tokens...
}
```

- The tokenName should be a descriptive name of the design property, in camelCase format.
- The value should be the value of the design property, in any format (e.g., color code, font name, pixel value).
- The type is an optional field that indicates the type of the design property (e.g., color, font, spacing).

2. Update the file paths in the script to match your project structure and file names.

3. Run the script by running the following command:
```npm run build```

4. The output files will be generated in the dist/tokens directory:

- tokens.json: a JSON file with cleaned variable names in kebab-case format.
- tokens.css: a CSS file with CSS custom properties in kebab-case format.
- tokens.scss: an SCSS file with SCSS variables in kebab-case format.
- tokens.ts: a TypeScript file with an object with camelCase variable names.

## Author
Simon Rønsholm Sandvik