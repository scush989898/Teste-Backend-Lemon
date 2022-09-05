class EligibilityError extends Error {
  statusCode;

  constructor(message: string, statusCode: number = 200) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { EligibilityError };
