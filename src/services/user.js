import Service from "./service";

class UserService extends Service {
  constructor() {
    super("/user");
  }

  validateEmail(email) {
    return this.axios.get(`user/validate/email/${email}`);
  }
}

export default new UserService();
