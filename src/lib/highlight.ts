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
