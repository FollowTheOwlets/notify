export class StringUtils {
  padString(str: string, length: number): string {
    return str + ' '.repeat(Math.max(0, length - str.length));
  }
}
