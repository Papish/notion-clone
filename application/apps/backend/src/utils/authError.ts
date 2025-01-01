// For all auth and jwt related error
export class AuthVerificationError extends Error {
  constructor(
    public statusCode: number = 401,
    public message: string = '',
  ) {
    super(message);
  }
}
