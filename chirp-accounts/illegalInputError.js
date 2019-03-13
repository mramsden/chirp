module.exports = class IllegalInputError extends Error {
  constructor(fieldName, message) {
    super();
    this.code = 400;
    this.fieldName = fieldName;
    this.message = message;
  }

  toJSON() {
    const { code, fieldName, message } = this;
    return {
      code,
      fieldName,
      message
    }
  }
};
