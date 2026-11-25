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

// Each named group is one token kind. Earlier groups win at the same position,
// so comments and strings are matched before the keywords inside them.
const STRING = String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\x60(?:[^\x60\\]|\\.)*\x60)`;

const TSX_PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)`,
    STRING,
    String.raw`(?<keyword>\b(?:${KEYWORDS.join("|")})\b)`,
    String.raw`(?<number>\b\d+(?:\.\d+)?\b)`,
    // A name directly after "<" or "</": a JSX tag or component.
    String.raw`(?<tag>(?<=<\/?)[A-Za-z][\w.]*)`,
  ].join("|"),
  "g",
);
