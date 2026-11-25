import type { Token, TokenKind } from "@/lib/highlight";

const COLOURS: Record<TokenKind, string> = {
  plain: "",
  comment: "text-code-comment italic",
  string: "text-code-string",
  keyword: "text-code-keyword",
  number: "text-code-number",
  tag: "text-code-tag",
};

/** One line of code with its tokens coloured. */
export function HighlightedLine({ tokens }: { tokens: readonly Token[] }) {
  return (
    <>
      {tokens.map((token, index) => (
        <span key={index} className={COLOURS[token.kind]}>
          {token.text}
        </span>
      ))}
    </>
  );
}
