module.exports = class IncorrectCredentialsError extends Error {
  constructor() {
    super();
    this.code = 400;
    this.message = 'incorrect login credentials';
  }

  toJSON() {
    const { code, message } = this;
    return { code, message };    
  }
}
