export class BusinessException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
