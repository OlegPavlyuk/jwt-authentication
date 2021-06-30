class UserService {
  async registration(email, password) {
    return { id: 1, email };
  }

  async login(email, password) {
    return { id: 1, email };
  }

  async getUsers() {
    return [
      { id: 1, email: "someuser@mail.com" },
      { id: 2, email: "someuser2@mail.com" },
      { id: 3, email: "someuser3@mail.com" },
    ];
  }
}

module.exports = new UserService();
