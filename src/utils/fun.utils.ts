export class FunctionUtils {
  static repeatable(fun: () => Promise<unknown>, try_: number, errorHandler?: (err) => void): Promise<unknown> {
    return fun().catch((err) => {
      if (!try_) {
        throw err;
      }
      if (errorHandler) {
        errorHandler(err);
      }
      return FunctionUtils.repeatable(fun, try_ - 1, errorHandler);
    });
  }
}
