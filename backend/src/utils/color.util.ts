export function colorText(text: string, color: string) {
    const colors: Record<string, string> = {
      reset: '\x1b[0m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
    };
    return `${colors[color] ?? ''}${text}${colors.reset}`;
  }
  