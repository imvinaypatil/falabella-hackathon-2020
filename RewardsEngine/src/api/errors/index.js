"use strict";

class ApiError extends Error {
  constructor({ id, status, code, title, detail, meta }) {
    super(title);
    this.id = id;
    this.code = code;
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.meta = meta;
  }
}

module.exports = { ApiError };
