export type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "tag";

export interface Token {
  readonly text: string;
  readonly kind: TokenKind;
}

export type Language = "tsx" | "bash";

const KEYWORDS = [
  "import", "export", "from", "default", "const", "let", "function", "return",
  "if", "else", "type", "interface", "extends", "as", "new", "async", "await",
  "typeof", "readonly", "null", "undefined", "true", "false",
];
