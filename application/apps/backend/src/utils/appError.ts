/**
 * For all auth and jwt related error
 * 
 * @class AuthVerificationError
 * @extends {Error}
 */
export class AuthVerificationError extends Error {
  constructor(
    public statusCode: number = 401,
    public message: string = "401, user authentication error",
  ) {
    super(message);
  }
}
