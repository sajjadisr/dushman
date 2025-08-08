export interface ILogger {
  info(message: string, meta?: any): void;
  error(message: string, error?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

class ConsoleLogger implements ILogger {
  private formatMeta(meta?: any): string {
    return meta ? ` ${JSON.stringify(meta)}` : '';
  }

  info(message: string, meta?: any): void {
    console.log(`[INFO] ${message}${this.formatMeta(meta)}`);
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR] ${message}`, error || '');
  }

  warn(message: string, meta?: any): void {
    console.warn(`[WARN] ${message}${this.formatMeta(meta)}`);
  }

  debug(message: string, meta?: any): void {
    console.debug(`[DEBUG] ${message}${this.formatMeta(meta)}`);
  }
}

export const logger = new ConsoleLogger();