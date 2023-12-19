export interface Token {
  value: string;
  type: string;
}

export interface Tokens {
  lcBlue1: Token;
  tietoevrySans: Token;
  fontSize24: Token;
  fontWeight300: Token;
  sizeXtraSmall: Token;
}

declare const tokens: Tokens;
export default tokens;