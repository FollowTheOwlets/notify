export class StringUtils {
  static padString(str: string, length: number): string {
    return str + ' '.repeat(Math.max(0, length - str.length));
  }

  static isBlank(str: string): boolean {
    return str === null || str === undefined || str.length === 0;
  }
}
