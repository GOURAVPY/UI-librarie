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
    // A name after "</", or after a "<" that does not follow an identifier
    // (which would be a type argument such as useState<T>): a JSX tag.
    String.raw`(?<tag>(?<=<\/)[A-Za-z][\w.]*|(?<=(?<![\w$)\]])<)[A-Za-z][\w.]*)`,
  ].join("|"),
  "g",
);

const BASH_PATTERN = new RegExp(
  [
    String.raw`(?<comment>#[^\n]*)`,
    STRING,
    // The command at the start of a line, such as npx or npm.
    String.raw`(?<keyword>^[a-z][\w-]*)`,
  ].join("|"),
  "gm",
);

const KINDS = ["comment", "string", "keyword", "number", "tag"] as const;

/** Finds which named group produced a match. */
function kindOf(groups: Record<string, string | undefined> = {}): TokenKind {
  return KINDS.find((kind) => groups[kind] !== undefined) ?? "plain";
}

/** Splits tokens at line breaks, so each line can be rendered on its own. */
function toLines(tokens: readonly Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    token.text.split("\n").forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ text: part, kind: token.kind });
    });
  }
  return lines;
}

/** Tokenizes code for colouring. Returns one list of tokens per line. */
export function highlight(code: string, language: Language): Token[][] {
  const pattern = language === "bash" ? BASH_PATTERN : TSX_PATTERN;
  const tokens: Token[] = [];
  let end = 0;
  for (const match of code.matchAll(pattern)) {
    if (match.index > end) {
      tokens.push({ text: code.slice(end, match.index), kind: "plain" });
    }
    tokens.push({ text: match[0], kind: kindOf(match.groups) });
    end = match.index + match[0].length;
  }
  if (end < code.length) tokens.push({ text: code.slice(end), kind: "plain" });
  return toLines(tokens);
}
