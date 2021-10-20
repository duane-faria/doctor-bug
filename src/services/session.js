import Service from "./service";

class SessionService extends Service {
  constructor() {
    super("/session");
  }
}

export default new SessionService();
