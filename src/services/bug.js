import Service from "./service";

class BugService extends Service {
  constructor() {
    super("/bug");
  }
}

export default new BugService();
