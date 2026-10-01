/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// A small generic highlighter for the snippets an analytics answer contains (dataLayer and _paq
// pushes, tracking code, JSON, HTML, SQL). A highlighter library cannot be lazy loaded from the
// Matomo UMD bundle, this one costs about 2 KB and never parses HTML: it only splits text.

export type CodeTokenType = 'comment' | 'string' | 'number' | 'keyword' | 'literal' | 'property'
  | 'function' | 'tag';

export interface CodeToken {
  type: CodeTokenType | null;
  text: string;
}

const KEYWORDS = [
  'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'delete',
  'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in',
  'instanceof', 'let', 'new', 'of', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var',
  'void', 'while', 'yield', 'echo', 'public', 'private', 'protected', 'static',
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP', 'BY', 'ORDER', 'LIMIT', 'JOIN', 'LEFT', 'ON',
  'AS', 'INSERT', 'INTO', 'UPDATE', 'SET', 'VALUES',
];

const LITERALS = ['true', 'false', 'null', 'undefined', 'NaN', 'window', 'document'];

const TOKEN_PATTERN = new RegExp([
  // 1 comments: line, block, HTML
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|<!--[\\s\\S]*?-->|#(?![\\w{])[^\\n]*)',
  // 2 a quoted key followed by a colon (JSON, object literals)
  '("(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:))',
  // 3 strings
  '("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)',
  // 4 HTML tags names
  '(<\\/?[A-Za-z][\\w:-]*|\\/>)',
  // 5 numbers
  '(\\b\\d+(?:\\.\\d+)?\\b)',
  // 6 words, classified below
  '([A-Za-z_$][\\w$]*)',
].join('|'), 'g');

export function tokenizeCode(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let last = 0;

  const push = (type: CodeTokenType | null, text: string) => {
    const previous = tokens[tokens.length - 1];
    if (!type && previous && !previous.type) {
      previous.text += text;
    } else {
      tokens.push({ type, text });
    }
  };

  code.replace(TOKEN_PATTERN, (match, comment, key, string, tag, number, word, offset: number) => {
    if (offset > last) {
      push(null, code.slice(last, offset));
    }
    last = offset + match.length;

    if (comment) {
      push('comment', match);
    } else if (key) {
      push('property', match);
    } else if (string) {
      push('string', match);
    } else if (tag) {
      push('tag', match);
    } else if (number) {
      push('number', match);
    } else if (word && KEYWORDS.includes(word)) {
      push('keyword', match);
    } else if (word && LITERALS.includes(word)) {
      push('literal', match);
    } else if (word && /^\s*\(/.test(code.slice(last))) {
      push('function', match);
    } else {
      push(null, match);
    }
    return match;
  });

  if (last < code.length) {
    push(null, code.slice(last));
  }

  return tokens;
}

/**
 * Replaces the text of a code element with highlighted spans, built with text nodes only.
 */
export default function highlightCode(element: Element): void {
  const doc = element.ownerDocument;
  const tokens = tokenizeCode(element.textContent || '');
  element.textContent = '';
  tokens.forEach((token) => {
    if (!token.type) {
      element.appendChild(doc.createTextNode(token.text));
      return;
    }
    const span = doc.createElement('span');
    span.className = `ai-chat-code-${token.type}`;
    span.textContent = token.text;
    element.appendChild(span);
  });
}
