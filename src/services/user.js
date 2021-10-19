import Service from "./service";

class UserService extends Service {
  constructor() {
    super("/user");
  }
}

export default new UserService();
