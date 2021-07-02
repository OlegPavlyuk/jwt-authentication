const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email: ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });
    const userData = new UserDto(user);
    const token = tokenService.generateToken({ ...userData });

    return { token, user: userData };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`Wrong credentials`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throw ApiError.BadRequest(`Wrong credentials`);
    }

    const userData = new UserDto(user);
    const token = tokenService.generateToken({ ...userData });

    return { token, user: userData };
  }

  async getUsers() {
    const users = await UserModel.find({}, "email");

    return users;
  }
}

module.exports = new UserService();
