import fs from 'node:fs/promises';
import path from 'node:path';
// Next's static segment files are emitted in nested __next directories. The client
// requests dotted segment names on a plain static host; publish those exact aliases.
async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.txt')) {
      const parts = path.relative('out', file).split(path.sep);
      const index = parts.findIndex((part) => part.startsWith('__next.'));
      if (index >= 0 && index < parts.length - 1) {
        await fs.copyFile(
          file,
          path.join('out', ...parts.slice(0, index), parts.slice(index).join('.')),
        );
      }
    }
  }
}
await walk('out');
