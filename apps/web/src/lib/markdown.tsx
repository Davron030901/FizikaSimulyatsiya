import type { ReactNode } from 'react';

/**
 * Minimal Markdown renderer for topic theory.
 *
 * Handles exactly what the content uses: `###` headings, paragraphs, `**bold**`,
 * `*italic*` and `` `code` ``. Output is React elements, never raw HTML, so the
 * renderer cannot be used as an injection vector once admins can edit theory text.
 */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={key} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).filter((block) => block.trim().length > 0);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const key = `block-${index}`;

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={key} className="pt-2 text-base font-semibold text-foreground">
              {renderInline(trimmed.slice(4), key)}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={key} className="pt-2 text-lg font-semibold text-foreground">
              {renderInline(trimmed.slice(3), key)}
            </h2>
          );
        }
        if (/^[-*] /.test(trimmed)) {
          const items = trimmed.split('\n').map((line) => line.replace(/^[-*] /, ''));
          return (
            <ul key={key} className="list-disc space-y-1.5 pl-5 text-muted-foreground">
              {items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="leading-[1.75] text-muted-foreground">
            {renderInline(trimmed, key)}
          </p>
        );
      })}
    </div>
  );
}
