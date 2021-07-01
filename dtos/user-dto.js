module.exports = class UserDto {
  constructor(model) {
    this._id = model._id;
    this.email = model.email;
  }
};
