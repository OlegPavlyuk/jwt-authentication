const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with email: ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });
    const userData = new UserDto(user);

    return userData;
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error(`User with email: ${email} not found`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throw new Error(`Wrong password`);
    }

    const userData = new UserDto(user);

    return userData;
  }

  async getUsers() {
    const users = await UserModel.find({}, "email");

    return users;
  }
}

module.exports = new UserService();
