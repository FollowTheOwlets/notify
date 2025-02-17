export class JsonUtils {
  static stringify(json: any, level: number): string {
    if (level <= 0) {
      return json.toString();
    }

    const obj = {};

    Object.keys(json).forEach((key) => {
      switch (typeof json[key]) {
        case 'bigint':
        case 'string':
        case 'symbol':
          obj[key] = json[key].toString();
          return;
        case 'boolean':
        case 'number':
          obj[key] = json[key];
          return;
        case 'object':
          obj[key] = JsonUtils.stringify(json[key], level - 1);
          return;
        case 'function':
        case 'undefined':
          return;
      }
    });

    return JSON.stringify(obj);
  }
}
