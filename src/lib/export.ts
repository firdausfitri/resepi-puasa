function escapeCsvCell(value: string): string {
  const escapedValue = value.replace(/"/g, '""');

  if (/[",\r\n]/.test(escapedValue)) {
    return `"${escapedValue}"`;
  }

  return escapedValue;
}

export function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map((cell) => escapeCsvCell(cell)).join(',')).join('\r\n');
}

export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const fileBlob = new Blob([content], { type: mimeType });
  const objectUrl = URL.createObjectURL(fileBlob);
  const anchor = document.createElement('a');

  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = 'none';

  document.body.append(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(objectUrl);
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (window.navigator.clipboard?.writeText) {
    try {
      await window.navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback ke kaedah textarea.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.append(textarea);

  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let isCopied = false;

  try {
    isCopied = document.execCommand('copy');
  } catch {
    isCopied = false;
  }

  textarea.remove();
  return isCopied;
}
