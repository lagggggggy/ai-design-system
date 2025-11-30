
export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDev = process.env.NODE_ENV !== 'production';

  log(level: LogLevel, message: string, data?: any) {
    if (!this.isDev && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'info':
        console.log(`%c${prefix}`, 'color: #3b82f6', message, data || '');
        break;
      case 'warn':
        console.warn(`%c${prefix}`, 'color: #f59e0b', message, data || '');
        break;
      case 'error':
        console.error(`%c${prefix}`, 'color: #ef4444', message, data || '');
        break;
      case 'debug':
        console.debug(`%c${prefix}`, 'color: #a8a29e', message, data || '');
        break;
    }
  }

  info(message: string, data?: any) { this.log('info', message, data); }
  warn(message: string, data?: any) { this.log('warn', message, data); }
  error(message: string, data?: any) { this.log('error', message, data); }
  debug(message: string, data?: any) { this.log('debug', message, data); }
}

export const logger = new Logger();
