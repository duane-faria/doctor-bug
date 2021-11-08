import Service from "./service";

class BugService extends Service {
  constructor() {
    super("/project");
  }
}

export default new BugService();
