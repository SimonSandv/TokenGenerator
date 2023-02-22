//Utils.ts

export const replaceNonAlphanumericCharacters = (str: string, to: string) =>
{
  return str.replace(/[^A-Za-z0-9]/g, to);
}

export const replaceSpaces = (str:string , to: string) => {
  return str.replace(/\s+/g, to);
};

export const removeExcessWhitespace = (str: string) => {
  return str.replace(/\s+/g, ' ').trim();
}

export const normalizeCase = (str: string): string =>
{
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = replaceNonAlphanumericCharacters(str, ' ')
    str = removeExcessWhitespace(str);
    str = str.toLowerCase();
    return str;
}

export const splitIntoWords = (str: string): string[] => {
  return str.split(/[^\w]+/).filter(word => word !== '');
};

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const toCamelCaseWords = (words: string[]): string => {
  return words.reduce((result, word, index) => {
    if (index === 0) {
      result += word.toLowerCase();
    } else {
      result += capitalizeFirstLetter(word);
    }
    return result;
  }, '');
};

export const toKebabCase = (str: string) => {
  const normalized = normalizeCase(str);
  return replaceSpaces(normalized, '-');
};

export const toSnakeCase = (str: string) => {
  const normalized = normalizeCase(str);
  return replaceSpaces(normalized, '_');
};

export const toCamelCase = (str: string) => {
  const normalized = normalizeCase(str);
  const words = splitIntoWords(normalized);
  const camelCased = toCamelCaseWords(words);
  return camelCased;
};

export const toPascalCase = (str: string): string => {
  const normalized = normalizeCase(str);
  const words = splitIntoWords(normalized);
  const capitalizedWords = words.map(capitalizeFirstLetter);
  return capitalizedWords.join('');
};

type Casing = 'pascal' | 'camel' | 'kebab' | 'snake';

export const cleanVariableNames = (obj: any, casing: Casing) => {
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    let cleanedKey;
    switch (casing) {
      case 'pascal':
        cleanedKey = toPascalCase(key);
        break;
      case 'snake':
        cleanedKey = toSnakeCase(key);
        break;
      case 'camel':
        cleanedKey = toCamelCase(key);
        break;
      case 'kebab':
        cleanedKey = toKebabCase(key);
        break;
      default:
        cleanedKey = key;
        break;
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      cleaned[cleanedKey] = cleanVariableNames(value, casing);
    } else {
      cleaned[cleanedKey] = value;
    }
  }
  return cleaned;
};
